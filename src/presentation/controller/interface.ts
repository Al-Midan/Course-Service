export interface Lesson {
  title: string;
  description: string;
  isFree: boolean;
  video: string | File;
}

export interface Section {
  title: string;
  description: string;
  lessons: Lesson[];
}

export interface ReceivedData {
  userData: any;
  sections: Section[];
  courseId:any;
}
