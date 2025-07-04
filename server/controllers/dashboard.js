import User from "../models/userModel.js";
import InterviewSession from "../models/interviewSessionModel.js";
import GeneralFeedback from "../models/generalFeedbackModel.js";

//  GET /dashboard  – return aggregated dashboard information for the authenticated user
export const getDashboardData = async (req, res) => {
    try {
        //  In a real implementation you would query multiple collections (sessions, scores, etc.)
        //  using the authenticated user id that was injected by the auth middleware.
        //  For now we return mocked data so the front-end can already integrate with the API.
        const authUserId = req.user?.userId;

        const requestedUserId = req.params.userId || req.query.userId;
        if (requestedUserId && requestedUserId !== String(authUserId)) {
            return res.status(403).json({ error: "Forbidden – You can only access your own dashboard" });
        }

        // Fetch sessions sorted newest first (no more auto-seeding)
        const sessions = await InterviewSession.find({ userId: authUserId }).sort({ createdAt: -1 }).lean();

        // Quick overview calculations
        const totalSessions = sessions.length;
        const avgScore = totalSessions ? Math.round(sessions.reduce((sum, s) => sum + s.overallScore, 0) / totalSessions) : 0;
        const practiceTimeSec = sessions.reduce((sum, s) => sum + s.durationSec, 0);
        const practiceTime = `${Math.floor(practiceTimeSec / 3600)}H`;

        // Skills improved – count of unique skills averaged >80
        const skillTotals = {};
        const skillCounts = {};
        sessions.forEach((s) => {
            s.skillScores.forEach(({ name, score }) => {
                skillTotals[name] = (skillTotals[name] || 0) + score;
                skillCounts[name] = (skillCounts[name] || 0) + 1;
            });
        });
        const skillsSummary = Object.keys(skillTotals).map((name) => ({
            name,
            score: Math.round(skillTotals[name] / skillCounts[name]),
        })).slice(0, 4); // limit 4 for dashboard

        const skillsImproved = skillsSummary.filter((s) => s.score >= 80).length;

        const quickOverview = { totalSessions, avgScore, practiceTime, skillsImproved, credits: 0 };

        // Recent sessions (max 3)
        const recentSessions = sessions.slice(0, 3).map((s) => ({
            title: `${s.interviewType.charAt(0).toUpperCase() + s.interviewType.slice(1)} Interview`,
            date: new Date(s.createdAt).toLocaleDateString(),
            score: s.overallScore,
        }));

        // Areas of improvement from GeneralFeedback
        const gf = await GeneralFeedback.findOne({ userId: authUserId }).lean();
        const areasOfImprovement = gf?.areasofImprovements || [];

        const user = await User.findById(authUserId).select("firstName");

        res.json({
            firstName: user?.firstName ?? "User",
            quickOverview,
            recentSessions,
            skillsSummary,
            areasOfImprovement,
        });
    } catch (err) {
        console.error("Dashboard error:", err);
        res.status(500).json({ error: "Failed to fetch dashboard data" });
    }
}; 