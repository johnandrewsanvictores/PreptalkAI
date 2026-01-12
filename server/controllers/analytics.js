// Analytics controller – returns analytics data for the authenticated user
import User from "../models/userModel.js";

export const getAnalyticsData = async (req, res) => {
    try {
        const authUserId = req.user?.userId;

        // If the client tries to pass a different user id via query/param, block it.
        const requestedUserId = req.params.userId || req.query.userId;
        if (requestedUserId && requestedUserId !== String(authUserId)) {
            return res.status(403).json({ error: "Forbidden – You can only access your own analytics" });
        }

        // You would query Session, Streak, etc. here using authUserId.

        const stats = [
            { label: "Avg Score", value: 0 },
            { label: "Total Practice Interview", value: 0 },
            { label: "Practice Time", value: "0H" },
            { label: "Day Streak", value: 0 }
        ];

        const chart = {
            labels: [],
            data: []
        };

        const skillsMap = {
            behavioral: [],
            technical: [],
            situational: [],
            "all-in-one": []
        };

        const interviewTypes = [];
        const recommendations = [];

        res.json({ stats, chart, skillsMap, interviewTypes, recommendations });
    } catch (err) {
        console.error("Analytics error:", err);
        res.status(500).json({ error: "Failed to fetch analytics" });
    }
}; 