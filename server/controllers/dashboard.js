import User from "../models/userModel.js";

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

        //  👉  Basic user information (first name is handy for greeting)
        const user = await User.findById(authUserId).select("firstName");

        const quickOverview = {
            totalSessions: 0,
            avgScore: 0,
            practiceTime: "0H",
            skillsImproved: 0,
            credits: 0
        };

        const recentSessions = [];

        const skillsSummary = [];

        const areasOfImprovement = [];

        res.json({
            firstName: user?.firstName ?? "User",
            quickOverview,
            recentSessions,
            skillsSummary,
            areasOfImprovement
        });
    } catch (err) {
        console.error("Dashboard error:", err);
        res.status(500).json({ error: "Failed to fetch dashboard data" });
    }
}; 