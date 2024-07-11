export interface Requesttype {
    userData: {
      _id: string;
      username: string;
      email: string;
      isBlocked: boolean;
      isVerified: boolean;
      roles: string;
      accessToken: string;
      refreshToken: string;
    };
    _id: string;
    username: string;
    userId: string;
    courseName: string;
    courseDescription: string;
    courseCategory: string;
    coursePrice: number;
    courseImage: string;
    isBlock: boolean;
    sections: {
      _id: string;
      title: string;
      description: string;
      lessons: any[];  
      username: string;
      owner: string;
      courseId: string;
      __v: number;
      sectionId: string;
    }[];
    __v: number;
    razorpay_payment_id: string;
  }
  