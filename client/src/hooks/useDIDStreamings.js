"use strict";

const DID_API = {
  websocketUrl: import.meta.env.VITE_D_ID_WEBSOCKET_URL,
  key: import.meta.env.VITE_D_ID_KEY,
};

const RTCPeerConnection = (
  window.RTCPeerConnection ||
  window.webkitRTCPeerConnection ||
  window.mozRTCPeerConnection
).bind(window);

let peerConnection;
let pcDataChannel;
let streamId;
let sessionId;
let sessionClientAnswer;

let statsIntervalId;
let lastBytesReceived;
let videoIsPlaying = false;
let streamVideoOpacity = 0;

const stream_warmup = true;
let isStreamReady = !stream_warmup;

let idleVideoElement = null;
let streamVideoElement = null;

const PRESENTER_TYPE = "talk";
let ws;

let onStreamReadyCallback = null;

export function setVideoElements(idleEl, streamEl) {
  idleVideoElement = idleEl;
  streamVideoElement = streamEl;
  if (idleVideoElement) idleVideoElement.setAttribute("playsinline", "");
  if (streamVideoElement) streamVideoElement.setAttribute("playsinline", "");
}

export async function connectToDIDStreamings() {
  return new Promise(async (resolve, reject) => {
    if (peerConnection && peerConnection.connectionState === "connected") {
      return resolve(); // already connected
    }

    stopAllStreams();
    closePC();

    try {
      ws = await connectToWebSocket(DID_API.websocketUrl, DID_API.key);

      const startStreamMessage = {
        type: "init-stream",
        payload: {
          source_url:
            "https://create-images-results.d-id.com/DefaultPresenters/Eric_m/image.png",
          presenter_type: PRESENTER_TYPE,
        },
      };
      sendMessage(ws, startStreamMessage);

      ws.onmessage = async (event) => {
        const data = JSON.parse(event.data);

        switch (data.messageType) {
          case "init-stream":
            const {
              id: newStreamId,
              offer,
              ice_servers: iceServers,
              session_id: newSessionId,
            } = data;
            streamId = newStreamId;
            sessionId = newSessionId;

            sessionClientAnswer = await createPeerConnection(offer, iceServers);
            const sdpMessage = {
              type: "sdp",
              payload: {
                answer: sessionClientAnswer,
                session_id: sessionId,
                presenter_type: PRESENTER_TYPE,
              },
            };
            sendMessage(ws, sdpMessage);

            return resolve(); // ✅ RESOLVE when session is ready
        }
      };
    } catch (error) {
      console.error("Failed to connect and set up stream:", error.type);
      reject(error);
    }
  });
}

export async function closeConnection() {
  const streamMessage = {
    type: "delete-stream",
    payload: {
      session_id: sessionId,
      stream_id: streamId,
    },
  };
  sendMessage(ws, streamMessage);

  // Close WebSocket connection
  if (ws) {
    ws.close();
    ws = null;
  }

  stopAllStreams();
  closePC();
}

function onIceGatheringStateChange() {
  console.log(peerConnection.iceGatheringState);
}

function onIceCandidate(event) {
  console.log("onIceCandidate", event);
  if (event.candidate) {
    const { candidate, sdpMid, sdpMLineIndex } = event.candidate;
    sendMessage(ws, {
      type: "ice",
      payload: {
        session_id: sessionId,
        candidate,
        sdpMid,
        sdpMLineIndex,
      },
    });
  } else {
    sendMessage(ws, {
      type: "ice",
      payload: {
        stream_id: streamId,
        session_id: sessionId,
        presenter_type: PRESENTER_TYPE,
      },
    });
  }
}
function onIceConnectionStateChange() {
  console.log(peerConnection.iceConnectionState);
  if (
    peerConnection.iceConnectionState === "failed" ||
    peerConnection.iceConnectionState === "closed"
  ) {
    stopAllStreams();
    closePC();
  }
}
function onConnectionStateChange() {
  // not supported in firefox
  console.log(peerConnection.connectionState);
  console.log("peerConnection", peerConnection.connectionState);

  if (peerConnection.connectionState === "connected") {
    playIdleVideo();
    /**
     * A fallback mechanism: if the 'stream/ready' event isn't received within 5 seconds after asking for stream warmup,
     * it updates the UI to indicate that the system is ready to start streaming data.
     */
    setTimeout(() => {
      if (!isStreamReady) {
        console.log("forcing stream/ready");
        isStreamReady = true;
        console.log("ready");
      }
    }, 5000);
  }
}
function onSignalingStateChange() {
  console.log(peerConnection.signalingState);
}

function onVideoStatusChange(videoIsPlaying, stream) {
  let status;

  if (videoIsPlaying) {
    status = "streaming";
    streamVideoOpacity = isStreamReady ? 1 : 0;
    setStreamVideoElement(stream);
  } else {
    status = "empty";
    streamVideoOpacity = 0;
  }

  streamVideoElement.style.opacity = streamVideoOpacity;
  idleVideoElement.style.opacity = 1 - streamVideoOpacity;

  console.log(status);
}

function onTrack(event) {
  /**
   * The following code is designed to provide information about wether currently there is data
   * that's being streamed - It does so by periodically looking for changes in total stream data size
   *
   * This information in our case is used in order to show idle video while no video is streaming.
   * To create this idle video use the POST https://api.d-id.com/talks (or clips) endpoint with a silent audio file or a text script with only ssml breaks
   * https://docs.aws.amazon.com/polly/latest/dg/supportedtags.html#break-tag
   * for seamless results use `config.fluent: true` and provide the same configuration as the streaming video
   */

  if (!event.track) return;

  statsIntervalId = setInterval(async () => {
    if (!peerConnection) return; // Prevent null call
    const stats = await peerConnection.getStats(event.track);
    stats.forEach((report) => {
      if (report.type === "inbound-rtp" && report.kind === "video") {
        const videoStatusChanged =
          videoIsPlaying !== report.bytesReceived > lastBytesReceived;

        if (videoStatusChanged) {
          videoIsPlaying = report.bytesReceived > lastBytesReceived;
          onVideoStatusChange(videoIsPlaying, event.streams[0]);
        }
        lastBytesReceived = report.bytesReceived;
      }
    });
  }, 500);
}

function onStreamEvent(message) {
  /**
   * This function handles stream events received on the data channel.
   * The 'stream/ready' event received on the data channel signals the end of the 2sec idle streaming.
   * Upon receiving the 'ready' event, we can display the streamed video if one is available on the stream channel.
   * Until the 'ready' event is received, we hide any streamed video.
   * Additionally, this function processes events for stream start, completion, and errors. Other data events are disregarded.
   */

  if (pcDataChannel.readyState === "open") {
    let status;
    const [event, _] = message.data.split(":");

    switch (event) {
      case "stream/started":
        status = "started";
        break;
      case "stream/done":
        status = "done";
        break;
      case "stream/ready":
        status = "ready";
        break;
      case "stream/error":
        status = "error";
        break;
      default:
        status = "dont-care";
        break;
    }

    // Set stream ready after a short delay, adjusting for potential timing differences between data and stream channels
    if (status === "ready") {
      setTimeout(() => {
        console.log("stream/ready");
        isStreamReady = true;

        console.log("ready");
      }, 1000);
    } else {
      console.log(event);
      console.log(status === "dont-care" ? event : status);
    }
  }
}

async function createPeerConnection(offer, iceServers) {
  if (!peerConnection) {
    peerConnection = new RTCPeerConnection({ iceServers });
    pcDataChannel = peerConnection.createDataChannel("JanusDataChannel");
    peerConnection.addEventListener(
      "icegatheringstatechange",
      onIceGatheringStateChange,
      true
    );
    peerConnection.addEventListener("icecandidate", onIceCandidate, true);
    peerConnection.addEventListener(
      "iceconnectionstatechange",
      onIceConnectionStateChange,
      true
    );
    peerConnection.addEventListener(
      "connectionstatechange",
      onConnectionStateChange,
      true
    );
    peerConnection.addEventListener(
      "signalingstatechange",
      onSignalingStateChange,
      true
    );
    peerConnection.addEventListener("track", onTrack, true);
    pcDataChannel.addEventListener("message", onStreamEvent, true);
  }

  await peerConnection.setRemoteDescription(offer);
  console.log("set remote sdp OK");

  const sessionClientAnswer = await peerConnection.createAnswer();
  console.log("create local sdp OK");

  await peerConnection.setLocalDescription(sessionClientAnswer);
  console.log("set local sdp OK");

  return sessionClientAnswer;
}

function setStreamVideoElement(stream) {
  if (!stream) return;

  streamVideoElement.srcObject = stream;
  streamVideoElement.loop = false;
  streamVideoElement.mute = !isStreamReady;

  // safari hotfix
  if (streamVideoElement.paused) {
    streamVideoElement
      .play()
      .then((_) => {})
      .catch((e) => {});
  }
}

function playIdleVideo() {
  idleVideoElement.src =
    DID_API.service == "clips" ? "alex_v2_idle.mp4" : "emma_idle.mp4";
}

function stopAllStreams() {
  if (streamVideoElement.srcObject) {
    console.log("stopping video streams");
    streamVideoElement.srcObject.getTracks().forEach((track) => track.stop());
    streamVideoElement.srcObject = null;
    streamVideoOpacity = 0;
  }
}

function closePC(pc = peerConnection) {
  if (!pc) return;
  console.log("stopping peer connection");
  pc.close();
  pc.removeEventListener(
    "icegatheringstatechange",
    onIceGatheringStateChange,
    true
  );
  pc.removeEventListener("icecandidate", onIceCandidate, true);
  pc.removeEventListener(
    "iceconnectionstatechange",
    onIceConnectionStateChange,
    true
  );
  pc.removeEventListener(
    "connectionstatechange",
    onConnectionStateChange,
    true
  );
  pc.removeEventListener("signalingstatechange", onSignalingStateChange, true);
  pc.removeEventListener("track", onTrack, true);
  pcDataChannel.removeEventListener("message", onStreamEvent, true);

  clearInterval(statsIntervalId);
  isStreamReady = !stream_warmup;
  streamVideoOpacity = 0;
  console.log("stopped peer connection");
  if (pc === peerConnection) {
    peerConnection = null;
  }
}

const maxRetryCount = 3;
const maxDelaySec = 4;

async function connectToWebSocket(url, token) {
  return new Promise((resolve, reject) => {
    const wsUrl = `${url}?authorization=Basic ${encodeURIComponent(token)}`;
    const ws = new WebSocket(wsUrl);

    ws.onopen = () => {
      console.log("WebSocket connection opened.");
      resolve(ws);
    };

    ws.onerror = (err) => {
      console.error("WebSocket error:", err);
      reject(err);
    };

    ws.onclose = () => {
      console.log("WebSocket connection closed.");
    };
  });
}

function sendMessage(ws, message) {
  if (ws.readyState === WebSocket.OPEN) {
    ws.send(JSON.stringify(message));
  } else {
    console.error("WebSocket is not open. Cannot send message.");
  }
}

function sendStreamMessage(input, index) {
  const streamMessage = {
    type: "stream-audio",
    payload: {
      script: {
        type: "audio",
        input,
      },
      config: {
        stitch: true,
      },
      background: {
        color: "#FFFFFF",
      },
      index, // Note : add index to track the order of the chunks (better performance), optional field
      session_id: sessionId,
      stream_id: streamId,
      presenter_type: PRESENTER_TYPE,
    },
  };

  sendMessage(ws, streamMessage);
}

function splitArrayIntoChunks(array, size) {
  if (!Array.isArray(array)) {
    throw new TypeError("Input should be an array");
  }
  if (typeof size !== "number" || size <= 0) {
    throw new TypeError("Size should be a positive number");
  }

  const result = [];
  for (let i = 0; i < array.length; i += size) {
    const chunk = array.slice(i, i + size);
    result.push(chunk);
  }
  return result;
}

export async function speakButton(inputText, voiceId = "en-US-JennyNeural") {
  if (!ws || ws.readyState !== WebSocket.OPEN) {
    alert("Please connect first!");
    return;
  }
  if (!inputText) {
    alert("Please enter some text for the AI to say.");
    return;
  }
  // Send the user input as a single chunk (can be split if needed)
  let chunks = inputText.split(" ");

  // Indicates end of text stream
  chunks.push("");

  for (const [index, chunk] of chunks.entries()) {
    const streamMessage = {
      type: "stream-text",
      payload: {
        script: {
          type: "text",
          input: chunk + " ",
          provider: {
            type: "microsoft",
            voice_id: voiceId,
          },
          ssml: true,
        },
        config: {
          stitch: true,
        },
        apiKeysExternal: {
          elevenlabs: { key: "" },
        },
        background: {
          color: "#FFFFFF",
        },
        index, // Note : add index to track the order of the chunks (better performance), optional field
        session_id: sessionId,
        stream_id: streamId,
        presenter_type: PRESENTER_TYPE,
      },
    };

    sendMessage(ws, streamMessage);
  }
}
