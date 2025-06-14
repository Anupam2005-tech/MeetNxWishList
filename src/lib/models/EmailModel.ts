
import mongoose, { Schema, Document } from 'mongoose';

export interface IEmail extends Document {
  email: string;
  createdAt: Date;
}

const EmailSchema: Schema = new Schema({
  email: {
    type: String,
    required: [true, 'Please provide an email address.'],
    unique: true,
    trim: true,
    lowercase: true,
    match: [/.+\@.+\..+/, 'Please fill a valid email address'],
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.models.Email || mongoose.model<IEmail>('Email', EmailSchema);
