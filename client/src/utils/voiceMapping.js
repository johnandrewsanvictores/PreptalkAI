// Voice mapping for different AI agents
export const getVoiceIdByAgentName = (agentName) => {
  const voiceMapping = {
    Sara: "en-US-EmmaNeural", // Default for Sara since not specified
    Davis: "en-US-DavisNeural",
    Rona: "en-US-AIGenerate2Neural",
    Harvey: "en-SG-WayneNeural",
    Rosa: "en-PH-RosaNeural",
    Brandon: "en-US-LewisMultilingualNeural",
  };

  return voiceMapping[agentName] || "en-US-EmmaNeural";
};

// Get agent name from interview settings
export const getAgentNameFromSettings = (interviewSettings) => {
  return interviewSettings?.selectedAgent?.name || "default";
};
