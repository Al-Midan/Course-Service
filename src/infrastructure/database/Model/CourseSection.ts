import mongoose, { Document, Schema } from "mongoose";

export interface ILesson {
  description: string;
  isFree: boolean;
  title: string;
  video: string;
}

export interface ICourse extends Document {
  title: string;
  description: string;
  lessons: ILesson[];
  username: string;
  owner: Schema.Types.ObjectId;
  courseId: Schema.Types.ObjectId;
}

const CourseSection: Schema = new Schema({
  title: {
    type: String,
  },
  description: {
    type: String,
  },
  lessons: {
    type: [
      {
        description: {
          type: String,
        },
        isFree: {
          type: Boolean,
          default: true,
        },
        title: {
          type: String,
        },
        video: { type: String },
      },
    ],
  },
  username: {
    type: String,
  },
  owner: {
    type: Schema.Types.ObjectId,
  },
  courseId: {
    type: Schema.Types.ObjectId,
  },
});

export default mongoose.model<ICourse>("CourseSection", CourseSection);
