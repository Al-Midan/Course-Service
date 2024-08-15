import { Kafka } from "kafkajs";
import { CourseType } from "../../application/interface/courseData";
import { ICourseRepository } from "../interface/ICourseRepository";
import { Course, CourseDocument } from "../database/Model/Course";
import { uploadS3Image, uploadS3Video } from "../s3/s3Uploader";
import CourseSection, { ICourse } from "../database/Model/CourseSection";
import { returnSection } from "../../domain/entities/sectionReturn";
import { CourseDetails } from "../../domain/entities/courseDetails";
import { Lesson, Section } from "../../presentation/controller/interface";
import { IisBlock } from "../../domain/entities/blockCourse";
import { Enrollment } from "../database/Model/CoursePayment";
import { encrypt } from "../../middleware/encryptionMiddleware";
export class CourseRepository implements ICourseRepository {
  async courseCreation(courseData: CourseType): Promise<CourseDocument | null> {
    const s3Response: any = await uploadS3Image(courseData.courseImage);
    if (s3Response.error) {
      console.error("Error uploading image to S3:", s3Response.error);

      throw new Error("Failed to upload image to S3");
    }

    console.log("URL of the image from the S3 bucket:", s3Response.Location);
    // Prepare course data for saving
    const courseDatas = {
      username: courseData.userData.username,
      userId: courseData.userData._id,
      courseName: courseData.courseName,
      courseDescription: courseData.courseDescription,
      courseCategory: courseData.courseCategory,
      coursePrice: courseData.coursePrice,
      courseImage: s3Response.Location,
    };

    // Save course data to the database
    const course = new Course(courseDatas);
    const savedCourse = await course.save();
    console.log("Course created successfully:", savedCourse);

    return savedCourse ? savedCourse : null;
  }

  async courseSection(extractedData: any): Promise<returnSection[] | null> {
    const { userData, courseId, videos } = extractedData;
    const sections: Section[] = Object.values(extractedData).filter(
      (value: any): value is Section =>
        value &&
        typeof value === "object" &&
        "title" in value &&
        "lessons" in value
    );

    const encryptedVideoUrls: string[] = [];

    for (const video of videos) {
      const s3Response: any = await uploadS3Video(video);
      if (s3Response.error) {
        console.error("Error uploading video to S3:", s3Response.error);
        throw new Error("Failed to upload video to S3");
      }
      console.log("URL of the video from the S3 bucket:", s3Response.Location);

      const encryptedUrl =  encrypt(s3Response.Location);
      encryptedVideoUrls.push(encryptedUrl);
    }

    const createdSections: returnSection[] = [];

    for (const section of sections) {
      const newSection: any = new CourseSection({
        title: section.title,
        description: section.description,
        lessons: section.lessons.map((lesson: Lesson, index: number) => ({
          ...lesson,
          video: encryptedVideoUrls[index],
        })),
        username: userData.username,
        owner: userData._id,
        courseId: courseId,
      });

      const savedSection = await newSection.save();
      createdSections.push(savedSection);

      await Course.findOneAndUpdate(
        { _id: courseId },
        { $push: { sections: { sectionId: savedSection._id } } },
        { new: true }
      );
    }

    console.log(
      "Course sections and encrypted video URLs successfully uploaded and saved.",
      createdSections
    );
    return createdSections.length > 0 ? createdSections : null;
  }
  async getAllCourse(): Promise<CourseDocument[] | null | undefined> {
    try {
      const getAllCourse = await Course.find();
      console.log("getAllCourse", getAllCourse);

      return getAllCourse ? getAllCourse : null;
    } catch (error) {
      console.log("Error in Getting All Course", error);
    }
  }
  async getCourseDetails(courseId: any): Promise<any> {
    try {
      const course = await Course.findById(courseId).lean();
      if (course) {
        const sectionIds = course.sections.map((section) => section.sectionId);
        const sections = await CourseSection.find({
          _id: { $in: sectionIds },
        }).lean();

        console.log("course", course);
        console.log("sections", sections);

        const formattedSections = sections.map((section) => ({
          ...section,
          sectionId: section._id,
        }));

        return {
          ...course,
          sections: formattedSections,
        };
      } else {
        return null;
      }
    } catch (error) {
      console.error(error);
      return null;
    }
  }
  async getBlockDetails(values: IisBlock) {
    try {
      const { courseId, isBlock } = values;
      const updatedCourse = await Course.findByIdAndUpdate(
        courseId,
        { isBlock },
        { new: true }
      );
      return updatedCourse || null;
    } catch (error) {
      console.error("Error in Course Block Repository", error);
      return null;
    }
  }
  async getAllEnrolledCourses(userId: string) {
    try {
      const enrolled = await Enrollment.find({ studentid: userId });
      if (enrolled.length === 0) {
        return [];
      }
      const courseIds = enrolled.map((course) => course.courseid);
      const EnrolledAllCourse = await Course.find({
        _id: { $in: courseIds },
      }).lean();
      return EnrolledAllCourse;
    } catch (error) {
      console.error("error in ALl Enrolled Courses", error);
      throw error;
    }
  }
  async deleteCourseDb(courseId: string) {
    try {
      const CourseDetails = await Course.findByIdAndDelete(courseId);
      return CourseDetails ? CourseDetails : null;
    } catch (error) {
      console.log("Error Deleting Course ", error);
      return null;
    }
  }
}
