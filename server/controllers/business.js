import Business from "../models/businessModel.js";

// POST /business – create or update business profile for authenticated entrepreneur
export const saveBusiness = async (req, res) => {
    try {
        const authUserId = req.user?.userId;
        const {
            businessName = "",
            businessType = "",
            industry = "",
            businessLocation = "",
            yearsInBusiness = "",
            employees = "",
            businessDescription = "",
            businessGoals = ""
        } = req.body;

        // Build object in the exact order defined in schema
        const data = {
            userId: authUserId,
            businessName,
            businessType,
            industry,
            businessLocation,
            yearsInBusiness,
            employees,
            businessDescription,
            businessGoals
        };

        // Upsert business document
        const business = await Business.findOneAndUpdate(
            { userId: authUserId },
            data,
            { new: true, upsert: true }
        );

        res.status(201).json({ success: true, business });
    } catch (err) {
        console.error("Business save error:", err);
        res.status(500).json({ error: "Failed to save business info" });
    }
};

// GET /business – return the entrepreneur business info
export const getBusiness = async (req, res) => {
    try {
        const authUserId = req.user?.userId;
        const business = await Business.findOne({ userId: authUserId });
        res.json({ success: true, business });
    } catch (err) {
        console.error("Business fetch error:", err);
        res.status(500).json({ error: "Failed to fetch business info" });
    }
}; 