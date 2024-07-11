export interface CourseReturn {
  username:string;
  _id?: unknown;
  userId?: string;
  courseName: string;
  courseDescription: string;
  courseCategory: string;
  coursePrice: number;
  courseImage: string;
  sections: { sectionId: string | null }[];
  isBlock: boolean;
}

