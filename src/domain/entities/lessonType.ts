type UserData = {
    _id: string;
    username: string;
    email: string;
    isBlocked: boolean;
    isVerified: boolean;
    roles: string;
    accessToken: string;
    refreshToken: string;
  };
  
 export type lessonType = {
    courseId: string;
    lessonId: string;
    userData: UserData;
  };