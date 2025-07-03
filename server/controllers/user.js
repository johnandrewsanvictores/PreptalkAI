import Resume from "../models/resumeModel.js";

export const createResume = async (req, res) => {
    try {
        console.log(req.body);
        const resume = await Resume.create({...req.body});
        
        res.status(201).json({
            resume: resume,
            success: "true",
            message: "Resume Info added successfully"
        });
    } catch(error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
}

export const getResume = async (req, res) => {
    try {
        const userId = req.query.userId;

        if (!userId) {
            return res.status(400).json({ error: 'Missing userId' });
        }

        const resume = await Resume.findOne({userId});

        res.status(200).json({
            resume: resume,
            success: "true",
            message: "Resume Info added successfully"
        })
    }catch(error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
}