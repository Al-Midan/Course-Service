import { NextFunction, Request, Response } from "express";
import { IcourseUsecase } from "../../application/interface/IcourseUsecase";
import { ReceivedData } from "./interface";
import {
  kafkaProducer,
  sendEnrolledCoursesResponse,
} from "../../infrastructure/broker/kafkaBroker/kafkaProducer";

export class courseController {
  private courseUsecase: IcourseUsecase;

  constructor(courseUsecase: IcourseUsecase) {
    this.courseUsecase = courseUsecase;
  }
  async createCourse(req: Request, res: Response, next: NextFunction) {
    try {
      const {
        courseName,
        courseDescription,
        courseCategory,
        coursePrice,
        userData,
      } = req.body;
      const courseImage = req.file;

      const courseData = {
        courseName,
        courseDescription,
        courseCategory,
        coursePrice: parseFloat(coursePrice),
        userData: JSON.parse(userData),
        courseImage,
      };

      const newCourse = await this.courseUsecase.createCourse(courseData);
      console.log("newCourse", newCourse);

      res
        .status(200)
        .json({ message: "Course Created Successfully", newCourse });
    } catch (error) {
      console.error("Failed to create course:", error);
      res.status(500).json({ message: "Failed to create course ", error });
    }
  }
  async createSection(req: Request, res: Response, next: NextFunction) {
    try {
      console.log("Received data:", req.body);
      const videos = req.files as Express.Multer.File[];
      console.log("Videos:", videos);

      const { userData, sections, courseId } = req.body;
      const extractedData: Record<string, any> = {};

      sections.forEach((section: any, sectionIndex: number) => {
        const { title: sectionTitle, description, lessons } = section;

        extractedData[`section${sectionIndex + 1}`] = {
          title: sectionTitle,
          description: description,
          lessons: lessons.map((lesson: any) => ({
            title: lesson.title,
            description: lesson.description,
            isFree: lesson.isFree,
            video: lesson.video,
          })),
        };
      });

      extractedData.userData = userData;
      extractedData.courseId = courseId;
      extractedData.videos = videos;

      console.log("Extracted Data:", extractedData);
      const courseSection = await this.courseUsecase.createCourseSection(
        extractedData
      );
      res.status(200).json({
        message: "Section created, awaiting admin approval",
        courseSection,
      });
    } catch (error) {
      console.error("Failed to create course Sections:", error);
      res
        .status(500)
        .json({ message: "Failed to create course Sections", error });
    }
  }
  async getCourse(req: Request, res: Response, next: NextFunction) {
    try {
      const allCourse = await this.courseUsecase.getallCourse();
      if (allCourse) {
        const filteredCourses = allCourse.filter((course) => !course.isBlock);

        res.status(200).json({
          message: "Course Datas Fetched Successfully",
          allCourse: filteredCourses,
        });
      }
    } catch (error) {
      console.log("Error In GetAllCourse Controller", error);

      res.status(500).json({
        message: "Failed to Get All courses",
        error,
      });
    }
  }

  async getCourseDetails(req: Request, res: Response, next: NextFunction) {
    try {
      const courseId = req.params.courseId;
      const courseDetails = await this.courseUsecase.getCourseDetails(courseId);
      console.log("cors", courseDetails);

      res.status(200).json({
        message: "Course Details Fetched Successfully",
        courseDetails,
      });
    } catch (error) {
      console.log("Error In GetAllCourse Controller", error);
      res.status(500).json({ message: "Failed to Get Course Details", error });
    }
  }
  async getAllCourse(req: Request, res: Response, next: NextFunction) {
    try {
      const allCourse = await this.courseUsecase.getallCourse();
      res
        .status(200)
        .json({ message: "Course Datas Fetched Successfully", allCourse });
    } catch (error) {
      console.log("Error In GetAllCourse Controller", error);

      res.status(500).json({
        message: "Failed to Get All courses",
        error,
      });
    }
  }
  async blockCourse(req: Request, res: Response) {
    try {
      const { courseId } = req.params;
      const { isBlock } = req.body;
      const values = { courseId, isBlock };
      const response = await this.courseUsecase.blockCourse(values);
      res.status(200).json({
        message: "Course block status updated successfully",
        response,
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Internal Server Error in Course Block" });
    }
  }
  async handleEnrolledCoursesRequest(userId: string) {
    try {
      const courses = await this.courseUsecase.getAllEnrolledCourses(userId);
      await kafkaProducer.sendEnrolledCoursesResponse(userId, courses || []);
    } catch (error) {
      console.error(`Error handling request for user ${userId}:`, error);
      await kafkaProducer.sendEnrolledCoursesResponse(userId, {
        error: "An error occurred while fetching courses",
      });
    }
  }
  async deleteCourse(req: Request, res: Response) {
    try {
      const CourseId = req.params.id;
      const response = await this.courseUsecase.deleteCourse(CourseId);
      res
        .status(200)
        .json({ message: "Course Deleted Successfully", response });
    } catch (error) {
      console.error("error Occured While Delete The Course ", error);
      res
        .status(500)
        .json({ message: "error Occured While Delete The Course " });
    }
  }
}
