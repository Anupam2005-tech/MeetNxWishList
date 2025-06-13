
import mongoose, { Schema, Document } from 'mongoose';

export interface IQuestion extends Document {
  email: string;
  question: string;
  createdAt: Date;
}

const QuestionSchema: Schema = new Schema({
  email: {
    type: String,
    required: [true, 'Please provide an email address.'],
    trim: true,
    lowercase: true,
    match: [/.+\@.+\..+/, 'Please fill a valid email address'],
  },
  question: {
    type: String,
    required: [true, 'Please provide a question.'],
    trim: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.models.Question || mongoose.model<IQuestion>('Question', QuestionSchema);
