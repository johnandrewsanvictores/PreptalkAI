// Interview history controller – returns stats and session list for authenticated user

export const getHistoryData = async (req, res) => {
    try {
        // 🛡️  Make sure the authenticated user is requesting only their own data
        const authUserId = req.user?.userId;

        // If the client tries to pass a different user id via query/param, block it.
        const requestedUserId = req.params.userId || req.query.userId;
        if (requestedUserId && requestedUserId !== String(authUserId)) {
            return res.status(403).json({ error: "Forbidden – You can only access your own history" });
        }

        // 👉  In a real implementation you would query a Session collection here, e.g:
        // const sessions = await Session.find({ userId: authUserId }).sort({ createdAt: -1 });
        // For now we just return empty arrays so that the frontend renders correctly.

        const stats = [
            { label: "Total Session", value: 0 },
            { label: "Avg Score", value: "0%" },
            { label: "Total Time", value: "0H" },
            { label: "Questions", value: 0 }
        ];

        const sessions = [];

        res.json({ stats, sessions });
    } catch (err) {
        console.error("History error:", err);
        res.status(500).json({ error: "Failed to fetch history" });
    }
}; 