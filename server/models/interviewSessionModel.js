import mongoose from 'mongoose';
import { ObjectId } from 'mongodb';

/**
 * InterviewSession schema
 * -----------------------
 * This schema stores a single practice interview session for a user.  We keep the
 * raw data here so that analytics & history endpoints can aggregate and derive
 * whatever statistics they need (average score, streaks, skill-level breakdowns, etc.).
 *
 * Keeping the data at the session level instead of directly persisting aggregated
 * analytics makes it trivial to re-compute metrics whenever our logic changes
 * without the risk of stale data.
 */
const skillScoreSchema = new mongoose.Schema({
  name: { type: String, required: true },   // e.g. "Communication"
  score: { type: Number, required: true },  // 0-100
}, { _id: false });

const interviewSessionSchema = new mongoose.Schema({
  userId: { type: ObjectId, ref: 'User', required: true },

  // "behavioral", "technical", "situational", "all-in-one", etc.
  interviewType: {
    type: String,
    required: true,
    enum: ['behavioral', 'technical', 'situational', 'all-in-one'],
  },

  // Overall score for the session (percentage 0-100)
  overallScore: {
    type: Number,
    required: true,
    min: 0,
    max: 100,
  },

  // Array that breaks the score down per skill assessed in the session.
  // Example: [{ name: 'Communication', score: 85 }, { name: 'Teamwork', score: 78 }]
  skillScores: {
    type: [skillScoreSchema],
    default: [],
  },

  // Duration (in seconds) the user spent in this session – handy for total practice time.
  durationSec: {
    type: Number,
    required: true,
    min: 0,
  },

  // Timestamp when the session finished (defaults to now)
}, { timestamps: true });

const InterviewSession = mongoose.model('InterviewSession', interviewSessionSchema);

export default InterviewSession; 