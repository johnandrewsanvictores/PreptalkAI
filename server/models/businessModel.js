import mongoose from 'mongoose';
import {ObjectId, Timestamp} from "mongodb";

const businessSchema = new mongoose.Schema({
    userId: { type: ObjectId, required: true },
    businessName: { type: String, required: true },
    businessType: { type: String, required: true },
    industry: { type: String, required: true },
    businessLocation: { type: String, required: true },
    yearsInBusiness: { type: String, required: true },
    employees: { type: String, required: true },
    businessDescription: { type: String, required: true },
    businessGoals: { type: String, required: true },

}, { timestamps: true });

const Business = mongoose.model('Business', businessSchema);

export default Business;