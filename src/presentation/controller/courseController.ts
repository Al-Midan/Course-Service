import { NextFunction, Request, Response } from "express";
import { IcourseUsecase } from "../../application/interface/IcourseUsecase";
import { ReceivedData } from "./interface";

export class courseController {
  private courseUsecase: IcourseUsecase;
  constructor(courseUsecase: IcourseUsecase) {
    this.courseUsecase = courseUsecase;
  }
  async createCourse(req: Request, res: Response, next: NextFunction) {
    try {
      console.log("Received data:", req.body);
      console.log("Received file:", req.file);

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
      console.log("newCourse",newCourse);
      
        res.status(200).json({ message: "Course Created Successfully" ,newCourse});
      
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

      const receivedData: ReceivedData = req.body;
      const extractedData: Record<string, any> = {};

      if (
        receivedData &&
        receivedData.sections &&
        Array.isArray(receivedData.sections)
      ) {
        const sections = receivedData.sections;
        const userData = receivedData.userData;
        const CourseId = receivedData.courseId;
        sections.forEach((x) => {
          console.log("x", x);
          x.lessons.forEach((y) => {
            console.log("y", y.video);
          });
        });
        
        sections.forEach((section, sectionIndex) => {
          const { title: sectionTitle, description, lessons } = section;

          extractedData[`section${sectionIndex + 1}`] = {
            title: sectionTitle,
            description: description,
            lessons: [],
          };

          lessons.forEach((lesson, lessonIndex) => {
            const {
              title: lessonTitle,
              description: lessonDescription,
              isFree,
              video,
            } = lesson;

            extractedData[`section${sectionIndex + 1}`].lessons.push({
              title: lessonTitle,
              description: lessonDescription,
              isFree: isFree,
              video: video,
            });
          });
        });
        extractedData.userData = userData;
        extractedData.CourseId = CourseId;
        extractedData.videos = videos;

        console.log("Extracted Data:", extractedData);
        const courseSection = await this.courseUsecase.createCourseSection(
          extractedData
        );
        res.status(200).json({ message: "Course Section Created Successfully" ,courseSection});
      }
    } catch (error) {
      console.error("Failed to create course Section:", error);
      res
        .status(500)
        .json({ message: "Failed to create course Section", error });
    }
  }
}
