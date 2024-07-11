import mongoose, { Schema, Document } from "mongoose";

export interface CourseDocument extends Document {
  username:string;
  userId?: string;
  courseName: string;
  courseDescription: string;
  courseCategory: string;
  coursePrice: number;
  courseImage: string;
  sections: { sectionId: string | null }[];
  isBlock: boolean;
}

// Define the Course schema
const CourseSchema = new Schema<CourseDocument>({
  username:{type: String },
  userId: { type: String },
  courseName: { type: String },
  courseDescription: { type: String },
  courseCategory: { type: String },
  coursePrice: { type: Number },
  courseImage: { type: String },
  sections: [{ sectionId: { type: Schema.Types.ObjectId, default: null } }],
  isBlock:{type:Boolean, default:true}
});

// Export the Course model
export const Course = mongoose.model<CourseDocument>("Course", CourseSchema);