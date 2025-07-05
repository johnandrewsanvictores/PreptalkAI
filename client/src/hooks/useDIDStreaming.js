import { useState, useEffect, useRef, useCallback } from "react";
import DIDStreamingService from "../utils/didStreamingService";

export const useDIDStreaming = () => {
  const [isConnecting, setIsConnecting] = useState(false);
  const [isConnected, setIsConnected] = useState(false);
  const [isStreamReady, setIsStreamReady] = useState(false);
  const [error, setError] = useState(null);
  const [connectionState, setConnectionState] = useState("new");

  const serviceRef = useRef(null);
  const videoRef = useRef(null);

  useEffect(() => {
    // Initialize service
    serviceRef.current = new DIDStreamingService();

    // Set up callbacks
    serviceRef.current.setCallbacks({
      onStreamReady: () => {
        console.log("🚀 DID Stream Ready callback triggered");
        console.log("📹 Video ref current:", videoRef.current);
        console.log("🎥 Video stream:", serviceRef.current.getVideoStream());

        setIsStreamReady(true);
        setIsConnected(true);
        setIsConnecting(false);

        // Set video stream when ready
        if (videoRef.current) {
          const stream = serviceRef.current.getVideoStream();
          if (stream) {
            console.log("✅ Setting video stream to video element");
            videoRef.current.srcObject = stream;

            // Ensure audio is enabled for D-ID speech
            videoRef.current.muted = false;
            console.log("🔊 Video unmuted for D-ID speech");

            // Try to play if not already playing
            videoRef.current.play().catch((error) => {
              console.log(
                "⚠️ Autoplay prevented, will play on user interaction:",
                error
              );
            });
          } else {
            console.log("⚠️ No video stream available");
          }
        } else {
          console.log("⚠️ Video ref not available");
        }
      },
      onError: (err) => {
        console.log("❌ DID Error callback:", err);
        setError(err.message || "Connection error");
        setIsConnecting(false);
        setIsConnected(false);
        setIsStreamReady(false);
      },
      onConnectionState: (state) => {
        console.log("🔗 DID Connection state callback:", state);
        setConnectionState(state);
        if (state === "failed" || state === "closed") {
          setIsConnected(false);
          setIsStreamReady(false);
        }
      },
    });

    return () => {
      if (serviceRef.current) {
        serviceRef.current.destroy();
      }
    };
  }, []);

  const connect = useCallback(async () => {
    if (isConnecting || isConnected) return;

    setIsConnecting(true);
    setError(null);

    try {
      // Ensure service is initialized first
      console.log("Initializing D-ID service...");
      const initialized = await serviceRef.current.init();
      if (!initialized) {
        console.error("Failed to initialize D-ID service");
        setIsConnecting(false);
        return false;
      }

      console.log("D-ID service initialized, connecting...");
      const connected = await serviceRef.current.connect();
      if (!connected) {
        console.error("Failed to connect to D-ID service");
        setIsConnecting(false);
        return false;
      }

      console.log("D-ID connection successful");
      return true;
    } catch (err) {
      console.error("Connection error:", err);
      setError(err.message || "Failed to connect");
      setIsConnecting(false);
      return false;
    }
  }, [isConnecting, isConnected]);

  const speak = useCallback(
    async (text, voiceId) => {
      console.log("Speak function called with:", {
        text: text?.substring(0, 50) + "...",
        voiceId,
        isStreamReady,
      });

      if (!isStreamReady || !serviceRef.current) {
        console.warn("Stream not ready for speaking:", {
          isStreamReady,
          hasService: !!serviceRef.current,
        });
        return false;
      }

      try {
        console.log("Calling serviceRef.current.speak...");
        const result = await serviceRef.current.speak(text, voiceId);
        console.log("Speech result:", result);
        return result;
      } catch (err) {
        console.error("Error speaking text:", err);
        setError(err.message || "Failed to speak text");
        return false;
      }
    },
    [isStreamReady]
  );

  const disconnect = useCallback(async () => {
    if (serviceRef.current) {
      await serviceRef.current.destroy();
    }
    setIsConnected(false);
    setIsStreamReady(false);
    setIsConnecting(false);
    setConnectionState("new");
  }, []);

  const setPresenter = useCallback((agentName) => {
    if (serviceRef.current) {
      serviceRef.current.setPresenter(agentName);
    }
  }, []);

  return {
    // State
    isConnecting,
    isConnected,
    isStreamReady,
    error,
    connectionState,

    // Actions
    connect,
    speak,
    disconnect,
    setPresenter,

    // Refs for video element
    videoRef,

    // Utils
    clearError: () => setError(null),
  };
};
