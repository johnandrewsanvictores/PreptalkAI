class DIDStreamingService {
  constructor() {
    this.config = null;
    this.peerConnection = null;
    this.streamId = null;
    this.sessionId = null;
    this.videoStream = null;
    this.isStreamReady = false;
    this.selectedAgent = null;
    this.streamCreatedAt = null;
    this.streamRequestCount = 0;

    // Callbacks
    this.onStreamReadyCallback = null;
    this.onErrorCallback = null;
    this.onConnectionStateCallback = null;
  }

  async init() {
    try {
      console.log("🔧 Initializing D-ID service...");
      const response = await fetch("/api.json");
      if (!response.ok) {
        throw new Error("Failed to load API configuration");
      }
      this.config = await response.json();
      console.log("✅ D-ID API initialized successfully");
      return true;
    } catch (error) {
      console.error("❌ Failed to initialize D-ID API:", error);
      if (this.onErrorCallback) {
        this.onErrorCallback(error);
      }
      return false;
    }
  }

  setCallbacks({ onStreamReady, onError, onConnectionState }) {
    this.onStreamReadyCallback = onStreamReady;
    this.onErrorCallback = onError;
    this.onConnectionStateCallback = onConnectionState;
  }

  async connect() {
    if (
      this.peerConnection &&
      this.peerConnection.connectionState === "connected" &&
      this.isStreamHealthy()
    ) {
      console.log("✅ Already connected with healthy stream");
      return true;
    }

    // Ensure config is loaded before connecting
    if (!this.config) {
      console.log("Config not loaded, initializing...");
      const initialized = await this.init();
      if (!initialized) {
        return false;
      }
    }

    this.cleanup();

    try {
      console.log("🚀 Creating new D-ID stream...");

      // Step 1: Create a new stream
      const streamResponse = await fetch(`${this.config.url}/talks/streams`, {
        method: "POST",
        headers: {
          Authorization: `Basic ${this.config.key}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          source_url: this.getPresenterConfig(),
        }),
      });

      if (!streamResponse.ok) {
        throw new Error(
          `Failed to create stream: ${streamResponse.statusText}`
        );
      }

      const streamData = await streamResponse.json();
      console.log("📊 Stream created:", streamData);

      this.streamId = streamData.id;
      this.sessionId = streamData.session_id;
      this.streamCreatedAt = Date.now();
      this.streamRequestCount = 0;
      const { offer, ice_servers } = streamData;

      // Step 2: Create peer connection and handle the offer
      await this.createPeerConnection(offer, ice_servers);

      return true;
    } catch (error) {
      console.error("❌ Failed to connect:", error);
      if (this.onErrorCallback) {
        this.onErrorCallback(error);
      }
      this.cleanup();
      return false;
    }
  }

  async createPeerConnection(offer, iceServers) {
    console.log("🔗 Creating peer connection with offer:", offer);
    console.log("🧊 Using ICE servers:", iceServers);

    if (!this.peerConnection) {
      this.peerConnection = new RTCPeerConnection({ iceServers });

      this.peerConnection.addEventListener("icegatheringstatechange", () => {
        console.log(
          "🧊 ICE gathering state:",
          this.peerConnection.iceGatheringState
        );
      });

      this.peerConnection.addEventListener(
        "connectionstatechange",
        this.onConnectionStateChange.bind(this)
      );
      this.peerConnection.addEventListener("track", this.onTrack.bind(this));
      this.peerConnection.addEventListener(
        "icecandidate",
        this.onIceCandidate.bind(this)
      );
    }

    try {
      console.log("📥 Setting remote description...");
      await this.peerConnection.setRemoteDescription(offer);
      console.log("✅ Remote description set successfully");

      console.log("📤 Creating answer...");
      const answer = await this.peerConnection.createAnswer();
      console.log("✅ Answer created:", answer);

      console.log("📥 Setting local description...");
      await this.peerConnection.setLocalDescription(answer);
      console.log("✅ Local description set successfully");

      // Step 3: Send the answer back to D-ID
      const sdpResponse = await fetch(
        `${this.config.url}/talks/streams/${this.streamId}/sdp`,
        {
          method: "POST",
          headers: {
            Authorization: `Basic ${this.config.key}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            answer: answer,
            session_id: this.sessionId,
          }),
        }
      );

      if (!sdpResponse.ok) {
        throw new Error(`Failed to send SDP answer: ${sdpResponse.statusText}`);
      }

      console.log("✅ SDP answer sent successfully");
      return answer;
    } catch (error) {
      console.error("❌ Error in createPeerConnection:", error);
      throw error;
    }
  }

  onIceCandidate(event) {
    if (event.candidate) {
      console.log("🧊 Sending ICE candidate:", event.candidate);
      const { candidate, sdpMid, sdpMLineIndex } = event.candidate;

      fetch(`${this.config.url}/talks/streams/${this.streamId}/ice`, {
        method: "POST",
        headers: {
          Authorization: `Basic ${this.config.key}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          candidate,
          sdpMid,
          sdpMLineIndex,
          session_id: this.sessionId,
        }),
      }).catch((error) => {
        console.error("❌ Failed to send ICE candidate:", error);
      });
    }
  }

  onConnectionStateChange() {
    console.log(
      "🔗 Connection state changed:",
      this.peerConnection.connectionState
    );

    if (this.onConnectionStateCallback) {
      this.onConnectionStateCallback(this.peerConnection.connectionState);
    }

    if (this.peerConnection.connectionState === "connected") {
      console.log("✅ Peer connection established successfully");
      // Set stream ready after connection
      setTimeout(() => {
        console.log("🎯 Setting stream ready to true");
        this.isStreamReady = true;
        if (this.onStreamReadyCallback) {
          console.log("📞 Calling onStreamReadyCallback");
          this.onStreamReadyCallback();
        }
      }, 2000);
    }

    if (
      this.peerConnection.connectionState === "failed" ||
      this.peerConnection.connectionState === "closed"
    ) {
      console.log("❌ Connection failed or closed, cleaning up");
      this.cleanup();
    }
  }

  onTrack(event) {
    console.log("🎥 onTrack event received:", event);
    console.log("📺 Event streams:", event.streams);
    console.log("🎬 Event track:", event.track);
    console.log("🎭 Track kind:", event.track.kind);
    console.log("🎭 Track readyState:", event.track.readyState);

    // Return the stream for the video element
    if (event.streams && event.streams[0]) {
      console.log("✅ Setting video stream:", event.streams[0]);
      this.videoStream = event.streams[0];

      // Log stream details
      console.log("📊 Stream details:", {
        id: event.streams[0].id,
        active: event.streams[0].active,
        tracks: event.streams[0].getTracks().map((track) => ({
          kind: track.kind,
          enabled: track.enabled,
          readyState: track.readyState,
        })),
      });

      // Call the callback immediately when we get the stream
      if (this.onStreamReadyCallback) {
        console.log("📞 Calling onStreamReadyCallback from onTrack");
        this.onStreamReadyCallback();
      }
    } else if (event.track) {
      // Handle individual track
      console.log("🎬 Handling individual track:", event.track.kind);

      // Create a MediaStream from the track if we don't have streams
      if (!this.videoStream && event.track.kind === "video") {
        console.log("🎥 Creating MediaStream from video track");
        this.videoStream = new MediaStream([event.track]);

        if (this.onStreamReadyCallback) {
          console.log("📞 Calling onStreamReadyCallback from track");
          this.onStreamReadyCallback();
        }
      }
    } else {
      console.log("⚠️ No streams or tracks found in onTrack event");
    }
  }

  async speak(text, voiceId) {
    console.log("🗣️ Speak method called:", {
      text: text?.substring(0, 50) + "...",
      voiceId,
    });

    // Ensure we have a healthy stream before speaking
    await this.ensureHealthyStream();

    console.log("📊 Current state:", {
      isStreamReady: this.isStreamReady,
      hasConnection: !!this.peerConnection,
      streamId: this.streamId,
      sessionId: this.sessionId,
      connectionState: this.peerConnection?.connectionState,
      streamAge: this.streamCreatedAt
        ? Math.floor((Date.now() - this.streamCreatedAt) / 1000) + "s"
        : "N/A",
      requestCount: this.streamRequestCount,
    });

    if (!this.isStreamReady) {
      console.log("❌ Cannot speak: stream not ready");
      throw new Error("Stream not ready");
    }

    if (!this.streamId || !this.sessionId) {
      console.log("❌ Cannot speak: no stream or session ID");
      throw new Error("No stream or session ID");
    }

    if (!text) {
      console.log("❌ Cannot speak: no text provided");
      throw new Error("No text provided");
    }

    if (!voiceId) {
      console.log("❌ Cannot speak: no voice ID provided");
      throw new Error("No voice ID provided");
    }

    try {
      this.streamRequestCount++;

      // Step 4: Create a talk stream with the text
      const talkResponse = await fetch(
        `${this.config.url}/talks/streams/${this.streamId}`,
        {
          method: "POST",
          headers: {
            Authorization: `Basic ${this.config.key}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            script: {
              type: "text",
              input: text,
              provider: {
                type: "microsoft",
                voice_id: voiceId,
              },
            },
            session_id: this.sessionId,
          }),
        }
      );

      if (!talkResponse.ok) {
        const errorText = await talkResponse.text();
        console.error("❌ Talk response error:", errorText);

        // If we get a 400 error, the stream might be invalid
        if (talkResponse.status === 400 || talkResponse.status === 402) {
          console.log(
            "🔄 Stream appears invalid, will reconnect on next request"
          );
          this.streamCreatedAt = 0; // Force reconnect on next speak
        }

        throw new Error(`Failed to create talk: ${talkResponse.statusText}`);
      }

      console.log("✅ Talk request sent successfully");
      return true;
    } catch (error) {
      console.error("❌ Error in speak method:", error);
      throw error;
    }
  }

  getVideoStream() {
    return this.videoStream;
  }

  cleanup() {
    console.log("🧽 Cleaning up D-ID service resources...");

    // Close peer connection
    if (this.peerConnection) {
      console.log("🔌 Closing peer connection...");

      // Event listeners are automatically cleaned up when peer connection is closed

      // Close the connection
      this.peerConnection.close();
      this.peerConnection = null;
      console.log("✅ Peer connection closed");
    }

    // Stop video stream if it exists
    if (this.videoStream) {
      console.log("🎥 Stopping video stream tracks...");
      this.videoStream.getTracks().forEach((track) => {
        track.stop();
        console.log(`🔴 Stopped ${track.kind} track`);
      });
      this.videoStream = null;
    }

    // Reset all state
    this.streamId = null;
    this.sessionId = null;
    this.isStreamReady = false;
    this.streamCreatedAt = null;
    this.streamRequestCount = 0;

    console.log("✅ D-ID service cleanup complete");
  }

  async destroy() {
    console.log("🧹 Starting D-ID service destruction...");

    // Stop any ongoing speech requests
    this.isStreamReady = false;

    if (this.streamId && this.sessionId) {
      try {
        console.log(`🗑️ Deleting D-ID stream: ${this.streamId}`);
        // Step 5: Delete the stream
        const response = await fetch(
          `${this.config.url}/talks/streams/${this.streamId}`,
          {
            method: "DELETE",
            headers: {
              Authorization: `Basic ${this.config.key}`,
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ session_id: this.sessionId }),
          }
        );

        if (response.ok) {
          console.log("✅ D-ID stream deleted successfully");
        } else {
          console.warn(
            `⚠️ Failed to delete stream: ${response.status} ${response.statusText}`
          );
        }
      } catch (error) {
        console.error("❌ Failed to delete D-ID stream:", error);
      }
    } else {
      console.log("ℹ️ No active stream to delete");
    }

    // Clean up peer connection and state
    this.cleanup();
    console.log("✅ D-ID service destruction complete");
  }

  setPresenter(agentName) {
    this.selectedAgent = agentName?.toLowerCase();
  }

  getPresenterConfig() {
    const defaultPresenters = {
      sara: "https://create-images-results.d-id.com/DefaultPresenters/Emma_f/v1_image.jpeg", // Default for Sara
      davis:
        "https://create-images-results.d-id.com/DefaultPresenters/Eric_m/image.png",
      rona: "https://create-images-results.d-id.com/DefaultPresenters/Noelle_f/image.png",
      harvey:
        "https://create-images-results.d-id.com/DefaultPresenters/Hassan_m/image.png",
      rosa: "https://create-images-results.d-id.com/DefaultPresenters/Aria_f/image.png",
      brandon:
        "https://create-images-results.d-id.com/DefaultPresenters/Brandon_m/image.png",
    };

    const presenterUrl =
      defaultPresenters[this.selectedAgent] ||
      "https://create-images-results.d-id.com/DefaultPresenters/Emma_f/v1_image.jpeg";
    console.log(`🎭 Using presenter for ${this.selectedAgent}:`, presenterUrl);

    // Return specific presenter or default fallback
    return presenterUrl;
  }

  isStreamHealthy() {
    // Check if stream is still valid (under 4 minutes old and less than 20 requests)
    if (!this.streamCreatedAt) return false;

    const streamAge = Date.now() - this.streamCreatedAt;
    const maxStreamAge = 4 * 60 * 1000; // 4 minutes (leave buffer before 5 min timeout)
    const maxRequests = 20; // Reasonable limit for requests per stream

    const isHealthy =
      streamAge < maxStreamAge && this.streamRequestCount < maxRequests;

    if (!isHealthy) {
      console.log(
        `⚠️ Stream unhealthy - Age: ${Math.floor(
          streamAge / 1000
        )}s, Requests: ${this.streamRequestCount}`
      );
    }

    return isHealthy;
  }

  async ensureHealthyStream() {
    if (!this.isStreamHealthy()) {
      console.log("🔄 Stream needs refresh, reconnecting...");
      await this.reconnect();
    }
  }

  async reconnect() {
    console.log("🔄 Reconnecting to D-ID...");
    this.cleanup();
    return await this.connect();
  }
}

export default DIDStreamingService;
