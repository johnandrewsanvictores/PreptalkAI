import Resume from "../models/resumeModel.js";

// POST /user/createResume – authenticated user only
export const createResume = async (req, res) => {
    try {
        const authUserId = req.user?.userId;

        // Prevent clients from forging another userId in the body
        const sanitizedBody = { ...req.body, userId: authUserId };

        // If a resume already exists for this user, update it instead of creating duplicate
        const resume = await Resume.findOneAndUpdate(
            { userId: authUserId },
            sanitizedBody,
            { new: true, upsert: true }
        );

        res.status(201).json({
            resume,
            success: true,
            message: "Resume saved successfully"
        });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

// GET /user/resume – returns resume for the authenticated user
export const getResume = async (req, res) => {
    try {
        const authUserId = req.user?.userId;

        const resume = await Resume.findOne({ userId: authUserId });

        res.status(200).json({
            resume,
            success: true,
            message: "Fetched resume successfully"
        });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};