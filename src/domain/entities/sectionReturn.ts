import { ObjectId } from 'mongodb';

interface Lesson {
  description: string;
  isFree: boolean;
  title: string;
  video: string;
  _id: ObjectId;
}
export interface returnSection {
    title: string;
  description: string;
  lessons: Lesson[];
  owner: ObjectId;
  courseId: ObjectId;
  username:string;
  _id: ObjectId;
  __v: number;
}