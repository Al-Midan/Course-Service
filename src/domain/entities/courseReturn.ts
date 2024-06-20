import { ILesson } from "../../infrastructure/database/Model/CourseSection";

export interface CourseReturn {
  _id?: unknown;
  userId?: string;
  courseName: string;
  courseDescription: string;
  courseCategory: string;
  coursePrice: number;
  courseImage: string;
  sections: { sectionId: string | null }[];
}

