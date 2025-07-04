import SessionDetails from "../models/sessionDetailsModel.js";
import InterviewSession from "../models/interviewSessionModel.js";
import User from "../models/userModel.js";

// POST /sessions – save a completed interview session
export const createSession = async (req, res) => {
    try {
        const userId = req.user?.userId;
        const { interviewType, overallScore, durationSec, skillScores = [], questionData = [], jobRole = "" } = req.body;

        if (!interviewType || overallScore === undefined || durationSec === undefined) {
            return res.status(400).json({ error: "interviewType, overallScore and durationSec are required" });
        }

        // If no skillScores provided but questionData contains per-skill scores, derive simple averages
        let finalSkillScores = skillScores;
        if (!skillScores.length && Array.isArray(questionData) && questionData.length) {
            const totals = {};
            const counts = {};
            questionData.forEach((q) => {
                if (q.skill && q.score !== undefined) {
                    totals[q.skill] = (totals[q.skill] || 0) + q.score;
                    counts[q.skill] = (counts[q.skill] || 0) + 1;
                }
            });
            finalSkillScores = Object.keys(totals).map((name) => ({
                name,
                score: Math.round(totals[name] / counts[name]),
            }));
        }

        // Save InterviewSession
        const sessionDoc = await InterviewSession.create({
            userId,
            interviewType,
            overallScore,
            durationSec,
            skillScores: finalSkillScores,
        });

        // Optionally save SessionDetails if questionData provided
        if (questionData.length) {
            await SessionDetails.create({
                _id: sessionDoc._id,
                userId,
                jobRole,
                questionData,
                difficulty: "unknown",
                interviewExperience: "neutral",
                interviewType,
                duration: `${durationSec}s`,
                detailedFeedback: { strengths: [], areasOfImprovement: [], recommendations: "" },
                agent: { name: "PrepAI", personality: "Neutral" },
                skills: {},
            });
        }

        res.status(201).json({ success: true, sessionId: sessionDoc._id });
    } catch (err) {
        console.error("CreateSession error:", err);
        res.status(500).json({ error: "Failed to save session" });
    }
};

// GET /sessions/:id – returns detailed session document
export const getSessionDetails = async (req, res) => {
    try {
        const { id } = req.params;
        const authUserId = req.user?.userId;

        let details = await SessionDetails.findById(id);
        if (!details) {
            return res.status(404).json({ error: "Session not found" });
        }

        if (String(details.userId) !== String(authUserId)) {
            return res.status(403).json({ error: "Forbidden" });
        }

        res.json(details);
    } catch (err) {
        console.error("SessionDetails error:", err);
        res.status(500).json({ error: "Failed to fetch session details" });
    }
}; 