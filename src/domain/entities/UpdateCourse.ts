interface Lesson {
    _id: string;
    title: string;
    description: string;
    isFree: boolean;
    video: string;
  }
  
  interface Section {
    _id: string;
    title: string;
    description: string;
    lessons: Lesson[];
  }
  
  export interface UpdateCourseBody {
    _id: string;
    courseName: string;
    courseDescription: string;
    courseCategory: string;
    coursePrice: number;
    courseImage: string;
    sections: Section[];
    userId: string;
    username: string;
  }