import { Reque } from "../../domain/entities/checkUser";
import { Requesttype } from "../../domain/entities/requestReturn";
import { Course } from "../database/Model/Course";
import { Enrollment } from "../database/Model/CoursePayment";
import { IBuyCourseRepository } from "../interface/IBuyCourseRepository";
import mongoose from "mongoose";
export class buyCourseRepoistory implements IBuyCourseRepository {
  async buyCourse(order: any, values: Requesttype) {
    try {
        let amountValue = order.amount / 100;
        const enrollment = new Enrollment({
            paymentid: order.id,
            amount: amountValue,
            studentid: new mongoose.Types.ObjectId(values.userData._id),
            studentname: values.userData.username, 
            email: values.userData.email,          
            courseid: new mongoose.Types.ObjectId(values._id),
            completedlessons: [],
            dateofEnrollment: new Date(),
        });
        const savedEnrollment = await enrollment.save();
        console.log("Enrollment saved successfully:", savedEnrollment);
        return savedEnrollment ? savedEnrollment : null;
    } catch (error) {
        console.error("Error saving enrollment:", error);
    }
    
}

  async getCourseWithId(userId: string) {
    const MyCourse = await Course.find({ userId });
    return MyCourse ? MyCourse : null;
  }
  async getEnrolledCourseWithId(userId: string) {
    try {
      const enrollments = await Enrollment.find({studentid: userId  });

      const courseIds = enrollments.map((enrollment) => enrollment.courseid);
      const courses = await Course.find({ _id: { $in: courseIds } });

      return courses ? courses : null;
    } catch (error) {
      console.error("Error getting enrolled courses with ID:", error);
      throw error;
    }
  }
  async  checkUserAccess(values: Reque): Promise<string> {
    const courseValue = await Course.findOne({ _id: values.courseId });
    
    if (!courseValue) {
      throw new Error('Course not found');
    }
    
    if (!courseValue.userId) {
      throw new Error('Course not found');
    }
  
    if (courseValue.userId.toString() === values.userData._id.toString()) {
      return "Owner";
    }
  
    const enrolledOrNot = await Enrollment.findOne({
      courseId: values.courseId,
      userId: values.userData._id
    });
  
    return enrolledOrNot ? "Enrolled" : "Not Enrolled";
  }
    async enrolledUserDetails(userId: string){
      try {
        const courses = await Course.find({ userId: userId });
        console.log("courses", courses);
    
        if (!courses || courses.length === 0) {
          console.log("No courses found for the user.");
          return;
        }
    
        const courseIds = courses.map(course => course._id);
    console.log("courseIds",courseIds);
    
        const enrollments = await Enrollment.find({ courseid: { $in: courseIds } });
    
        console.log("enrollments", enrollments);
        return enrollments;
      } catch (error) {
        console.error("Error fetching enrolled user details:", error);
      }
      
    }
}
