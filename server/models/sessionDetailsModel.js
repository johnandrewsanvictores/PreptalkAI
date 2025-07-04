import mongoose from 'mongoose';
import { ObjectId } from 'mongodb';

/*
 * SessionDetails schema – rich representation of a single interview session.
 * Mirrors the `session_details` table in the ER diagram.
 */

// Question sub-document
const questionSchema = new mongoose.Schema({
  question: { type: String, required: true },
  feedback: { type: String, required: true },
  video_path_segment: { type: String, required: true },
  score: { type: Number, required: true }, // 0-100 or 0-10 depending on scale
  emotion: { type: String, required: true },
  fillerWords: { type: Number, required: true },
}, { _id: false });

// Detailed feedback sub-document
const detailedFeedbackSchema = new mongoose.Schema({
  strengths: { type: [String], default: [] },
  areasOfImprovement: { type: [String], default: [] },
  recommendations: { type: String, default: '' },
}, { _id: false });

// Agent sub-document
const agentSchema = new mongoose.Schema({
  name: { type: String, required: true },
  personality: { type: String, required: true },
}, { _id: false });

// Main session details schema
const sessionDetailsSchema = new mongoose.Schema({
  userId: { type: ObjectId, ref: 'User', required: true },

  jobRole: { type: String, required: true },
  questionData: { type: [questionSchema], required: true },
  difficulty: { type: String, required: true },
  interviewExperience: { type: String, required: true },
  interviewType: { type: String, required: true }, // eg behavioral / technical
  duration: { type: String, required: true }, // could store seconds instead

  detailedFeedback: { type: detailedFeedbackSchema, required: true },
  agent: { type: agentSchema, required: true },

  // Complex skills object – we keep flexible by allowing mixed type
  skills: { type: mongoose.Schema.Types.Mixed, default: {} },

}, { timestamps: true });

const SessionDetails = mongoose.model('SessionDetails', sessionDetailsSchema);
export default SessionDetails; 