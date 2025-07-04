import mongoose from 'mongoose';
import {ObjectId, Timestamp} from "mongodb";

const resumeSchema = new mongoose.Schema({
    userId: { type: ObjectId, required: true },
    fullName: { type: String, required: true },
    email: { type: String, required: false },
    location: { type: String, required: true },
    jobRole: { type: String, required: false },
    softSkills: { type: String, required: false },
    hardSkills: { type: String, required: false },
    education: {type: String, default: true },
    certification: {type: String, default: ""},
    projects: {type: String, default: ""},
    bio: {type: String, required: true}

}, { timestamps: true });

const Resume = mongoose.model('Resume', resumeSchema);

export default Resume;