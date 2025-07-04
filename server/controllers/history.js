// Interview history controller – returns stats and session list for authenticated user

import InterviewSession from "../models/interviewSessionModel.js";

export const getHistoryData = async (req, res) => {
    try {
        // 🛡️  Make sure the authenticated user is requesting only their own data
        const authUserId = req.user?.userId;

        // If the client tries to pass a different user id via query/param, block it.
        const requestedUserId = req.params.userId || req.query.userId;
        if (requestedUserId && requestedUserId !== String(authUserId)) {
            return res.status(403).json({ error: "Forbidden – You can only access your own history" });
        }

        // Seed sessions if this demo user still has none (logic shared with analytics)
        const userSessionsCount = await InterviewSession.countDocuments({ userId: authUserId });
        if (userSessionsCount === 0) {
            // analytics seeding would have run earlier; if not, trigger seeding now
            // (importing analytics logic would cause circular dep, so we just respond with empty)
            return res.json({ stats: [], sessions: [] });
        }

        // Pull sessions, newest first
        const sessions = await InterviewSession.find({ userId: authUserId }).sort({ createdAt: -1 }).lean();

        // Stats
        const totalSession = sessions.length;
        const avgScore = sessions.reduce((sum, s) => sum + s.overallScore, 0) / totalSession;
        const totalDurationSec = sessions.reduce((sum, s) => sum + s.durationSec, 0);
        const totalQuestions = totalSession * 7; // placeholder (assume 7 questions)

        const stats = [
            { label: "Total Session", value: totalSession },
            { label: "Avg Score", value: `${Math.round(avgScore)}%` },
            { label: "Total Time", value: `${Math.floor(totalDurationSec/3600)}H` },
            { label: "Questions", value: totalQuestions }
        ];

        // Map sessions to frontend structure (max 10 recent)
        const statusColor = "bg-green-100 text-green-800";
        const recentSessions = sessions.slice(0, 10).map((s) => {
            const title = `${s.interviewType.charAt(0).toUpperCase()+s.interviewType.slice(1)} Interview - ${new Date(s.createdAt).toLocaleDateString()}`;
            const date = new Date(s.createdAt).toLocaleDateString();
            return {
                id: s._id,
                title,
                date,
                desc: `Overall score: ${s.overallScore}%`,
                status: `${s.overallScore}%`,
                statusColor,
            };
        });

        res.json({ stats, sessions: recentSessions });
    } catch (err) {
        console.error("History error:", err);
        res.status(500).json({ error: "Failed to fetch history" });
    }
}; 