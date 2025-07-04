import mongoose from 'mongoose';
import { ObjectId } from 'mongodb';

const generalFeedbackSchema = new mongoose.Schema({
  userId: { type: ObjectId, ref: 'User', required: true },

  // Arrays / free-text feedback generated after multiple sessions
  areasofImprovements: {
    type: [String],
    default: [],
  },
  focusArea: { type: String, default: '' },
  strength: { type: String, default: '' },
  nextGoal: { type: String, default: '' },
  consistency: { type: String, default: '' },
}, { timestamps: true });

const GeneralFeedback = mongoose.model('GeneralFeedback', generalFeedbackSchema);
export default GeneralFeedback; 