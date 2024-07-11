import { ObjectId } from 'mongodb';

export interface CourseDetails {
  _id: ObjectId;
  username: string;
  userId: string;
  courseName: string;
  courseDescription: string;
  courseCategory: string;
  coursePrice: number;
  courseImage: string;
  isBlock: boolean;
  sections:ISection ;
  __v: number;
}

 interface ISection {
  _id: ObjectId;
  title: string;
  description: string;
  lessons: ILesson[];
  username: string;
  owner: ObjectId;
  courseId: ObjectId;
  __v: number;
}

 interface ILesson {
  description: string;
  isFree: boolean;
  title: string;
  video: string;
}
