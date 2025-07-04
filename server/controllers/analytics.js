// Analytics controller – returns analytics data for the authenticated user
import User from "../models/userModel.js";
import InterviewSession from "../models/interviewSessionModel.js";
import GeneralFeedback from "../models/generalFeedbackModel.js";

// Skill templates – used both for seeding and aggregating
const SKILL_TEMPLATES = {
    behavioral: ["Communication", "Self-Motivation", "Teamwork", "Resilience"],
    technical: ["Critical Thinking", "Analytical Reasoning", "Attention to Detail", "Technical Clarity"],
    situational: ["Decision-Making", "Adaptability", "Conflict Resolution", "Prioritization"],
    "all-in-one": [
        "Communication", "Self-Motivation", "Teamwork", "Resilience",
        "Critical Thinking", "Analytical Reasoning", "Attention to Detail", "Technical Clarity",
        "Decision-Making", "Adaptability", "Conflict Resolution", "Prioritization"
    ]
};

// Utility to pick n random items from array (without replacement)
function pickRandom(arr, n) {
    const copy = [...arr];
    const picked = [];
    while (picked.length < n && copy.length) {
        const idx = Math.floor(Math.random() * copy.length);
        picked.push(copy.splice(idx, 1)[0]);
    }
    return picked;
}

// ------------------------------
// Controller  – /analytics
// ------------------------------
export const getAnalyticsData = async (req, res) => {
    try {
        const authUserId = req.user?.userId;
        const requestedUserId = req.params.userId || req.query.userId;
        if (requestedUserId && requestedUserId !== String(authUserId)) {
            return res.status(403).json({ error: "Forbidden – You can only access your own analytics" });
        }

        // Fetch the user document for first-name checks & streak calc convenience
        const userDoc = await User.findById(authUserId).lean();

        // 1️⃣ Pull all sessions for the user (optionally filter by ?range=days)
        let sessions = await InterviewSession.find({ userId: authUserId }).lean();

        const rangeParam = parseInt(req.query.range, 10);
        if (!isNaN(rangeParam) && rangeParam > 0) {
            const cutoff = new Date();
            cutoff.setDate(cutoff.getDate() - rangeParam);
            sessions = sessions.filter((s) => s.createdAt >= cutoff);
        }

        if (!sessions.length) {
            // If a non-demo user has no sessions, return empty placeholders like before
            return res.json({
                stats: [
                    { label: "Avg Score", value: "0%" },
            { label: "Total Practice Interview", value: 0 },
            { label: "Practice Time", value: "0H" },
            { label: "Day Streak", value: 0 }
                ],
                chart: { labels: [], data: [] },
                skillsMap: { behavioral: [], technical: [], situational: [], "all-in-one": [] },
                interviewTypes: [],
                recommendations: []
            });
        }

        // 2️⃣ Aggregate stats
        const totalInterviews = sessions.length;
        const avgScore = sessions.reduce((sum, s) => sum + s.overallScore, 0) / totalInterviews;
        const totalDurationSec = sessions.reduce((sum, s) => sum + (s.durationSec || 0), 0);

        // Day-streak calculation: count consecutive days up to today with at least one session
        const uniqueDays = new Set(sessions.map(s => new Date(s.createdAt).toDateString()));
        let streak = 0;
        for (let i = 0; i < 365; i++) { // max lookback 1 year
            const date = new Date();
            date.setDate(date.getDate() - i);
            if (uniqueDays.has(date.toDateString())) {
                streak += 1;
            } else {
                break;
            }
        }

        const stats = [
            { label: "Avg Score", value: `${Math.round(avgScore)}%` },
            { label: "Total Practice Interview", value: totalInterviews },
            { label: "Practice Time", value: `${Math.floor(totalDurationSec / 3600)}H` },
            { label: "Day Streak", value: streak }
        ];

        // 3️⃣ Performance trend – average per week (last 4 weeks)
        const weeks = [0, 1, 2, 3]; // 0 => this week, 1 => last week, etc.
        const chartLabels = weeks.map(i => `Week ${4 - i}`); // Week 4,3,2,1 chronological
        const weeklyAverages = weeks.map(weekOffset => {
            const start = new Date();
            start.setDate(start.getDate() - (weekOffset + 1) * 7);
            const end = new Date();
            end.setDate(end.getDate() - weekOffset * 7);
            const weekSessions = sessions.filter(s => s.createdAt >= start && s.createdAt < end);
            if (!weekSessions.length) return 0;
            return weekSessions.reduce((sum, s) => sum + s.overallScore, 0) / weekSessions.length;
        }).reverse(); // older weeks first to match labels order earlier

        const chart = {
            labels: chartLabels,
            data: weeklyAverages.map(v => Math.round(v))
        };

        // 4️⃣ Skills map – average score per skill per interview type
        const skillsMap = { behavioral: [], technical: [], situational: [], "all-in-one": [] };
        const typeGroups = sessions.reduce((acc, s) => {
            if (!acc[s.interviewType]) acc[s.interviewType] = [];
            acc[s.interviewType].push(s);
            return acc;
        }, {});

        for (const [type, sessList] of Object.entries(typeGroups)) {
            const skillTotals = {};
            const skillCounts = {};
            sessList.forEach(s => {
                s.skillScores.forEach(({ name, score }) => {
                    skillTotals[name] = (skillTotals[name] || 0) + score;
                    skillCounts[name] = (skillCounts[name] || 0) + 1;
                });
            });
            skillsMap[type] = Object.keys(skillTotals).map(name => ({
                name,
                score: Math.round(skillTotals[name] / skillCounts[name])
            }));
        }

        // 5️⃣ Interview type summary
        const interviewTypes = Object.entries(typeGroups).map(([type, list]) => {
            const avg = list.reduce((sum, s) => sum + s.overallScore, 0) / list.length;
            const prettyName = type.charAt(0).toUpperCase() + type.slice(1).replace(/-/g, ' ');
            const colors = {
                technical: "bg-blue-100",
                behavioral: "bg-green-100",
                situational: "bg-yellow-100",
                "all-in-one": "bg-orange-100"
            };
            return {
                name: prettyName,
                score: Math.round(avg),
                sessions: list.length,
                color: colors[type] || "bg-gray-100"
            };
        });

        let recommendations = [];
        try {
            const skillTotalsOverall = {};
            const skillCountsOverall = {};
            sessions.forEach(s => {
                s.skillScores.forEach(({ name, score }) => {
                    skillTotalsOverall[name] = (skillTotalsOverall[name] || 0) + score;
                    skillCountsOverall[name] = (skillCountsOverall[name] || 0) + 1;
                });
            });
            const overallSkillAverages = Object.keys(skillTotalsOverall).map(name => ({
                name,
                avg: skillTotalsOverall[name] / skillCountsOverall[name]
            }));

            let weakestSkillName = null;
            if (overallSkillAverages.length) {
                overallSkillAverages.sort((a, b) => a.avg - b.avg);
                const weakest = overallSkillAverages[0];
                weakestSkillName = weakest.name;
                const strongest = overallSkillAverages[overallSkillAverages.length - 1];

                // Focus Area – weakest skill
                const focusContent = `Your ${weakest.name} skill shows room for improvement (avg ${Math.round(weakest.avg)}%). Consider targeted practice to boost this area.`;
                recommendations.push({
                    title: "Focus Area",
                    color: "bg-yellow-50",
                    content: focusContent,
                });

                // Strength – strongest skill
                recommendations.push({
                    title: "Strength",
                    color: "bg-green-50",
                    content: `Excellent performance in ${strongest.name}! Your average is ${Math.round(strongest.avg)}%. Keep leveraging this strength in interviews.`,
                });
            }

            // Next Goal – push overall average up
            recommendations.push({
                title: "Next Goal",
                color: "bg-blue-50",
                content: `Aim to reach ${(Math.min(100, Math.round(avgScore + 5)))}% average score by completing a few more sessions focusing on your weaker areas this month.`,
            });

            // Consistency – based on streak
            recommendations.push({
                title: "Consistency",
                color: "bg-orange-50",
                content: streak > 0
                    ? `Great job maintaining a ${streak}-day streak! Try to keep up the momentum with at least 2 sessions per week.`
                    : `Start building a practice habit with regular sessions – even 1-2 each week can make a big difference.`,
            });

            // --- Areas of Improvement array (max 3) ---
            const areasofImprovementsArr = [
                `Focus on improving your ${weakestSkillName || 'communication'} through targeted exercises and mock questions.`,
                "Include more concrete examples to substantiate your answers.",
                "Reduce filler words and maintain a steady pace for better clarity.",
            ];

            // attach to outer scope for persistence later
            global.__aoiGenerated = areasofImprovementsArr;
        } catch (recErr) {
            console.error("Recommendation generation failed:", recErr);
        }

        // Save/update general feedback doc for the user (demo purposes)
        try {
            if (recommendations.length) {
                const payload = {
                    focusArea: recommendations.find(r => r.title === 'Focus Area')?.content || '',
                    strength: recommendations.find(r => r.title === 'Strength')?.content || '',
                    nextGoal: recommendations.find(r => r.title === 'Next Goal')?.content || '',
                    consistency: recommendations.find(r => r.title === 'Consistency')?.content || '',
                    areasofImprovements: global.__aoiGenerated || [],
                };
                await GeneralFeedback.findOneAndUpdate(
                    { userId: authUserId },
                    payload,
                    { upsert: true, new: true }
                );
            }
        } catch (gfErr) {
            console.error("GeneralFeedback persist error:", gfErr);
        }

        res.json({ stats, chart, skillsMap, interviewTypes, recommendations });
    } catch (err) {
        console.error("Analytics error:", err);
        res.status(500).json({ error: "Failed to fetch analytics" });
    }
}; 