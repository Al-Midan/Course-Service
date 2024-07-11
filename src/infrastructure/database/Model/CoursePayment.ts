import mongoose, { Schema, Document } from 'mongoose';

// MongoDB Schema
const EnrollmentSchema = new Schema({
  paymentid: { type: String },
  amount: { type: Number },
  studentid: { type: Schema.Types.ObjectId },
  studentname: { type: String },         
  email: { type: String },               
  courseid: { type: Schema.Types.ObjectId },
  completedlessons: { type: [String], default: [] },
  dateofEnrollment: { type: Date, default: Date.now }
});

// TypeScript interface
export interface IEnrollment extends Document {
  paymentid: string;
  amount: number;
  studentid: mongoose.Types.ObjectId;
  studentname: string;                    
  email: string;                          
  courseid: mongoose.Types.ObjectId;
  completedlessons: string[];
  dateofEnrollment: Date;
}

// Create and export the model
export const Enrollment = mongoose.model<IEnrollment>('Enrollment', EnrollmentSchema);
