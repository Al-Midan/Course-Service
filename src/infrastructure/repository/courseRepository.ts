// import { Kafka } from "kafkajs";
import { CourseType } from "../../application/interface/courseData";
import { ICourseRepository } from "../interface/ICourseRepository";
import { Course, CourseDocument } from "../database/Model/Course";
import { uploadS3Image, uploadS3Video } from "../s3/s3Uploader";
import CourseSection, { ICourse } from "../database/Model/CourseSection";
import { returnSection } from "../../domain/entities/sectionReturn";
export class CourseRepository implements ICourseRepository {
  async courseCreation(courseData: CourseType): Promise<CourseDocument | null> {
    //   const kafka = new Kafka({
    //     clientId: "my-app",
    //     brokers: ["localhost:29092"],
    //   });

    // const consumer = kafka.consumer({ groupId: "user-group" });
    // await consumer.connect();
    // await consumer.subscribe({
    //   topic: "user-values-topic",
    //   fromBeginning: true,
    // });

    // let userId;
    // await consumer.run({
    //   eachMessage: async ({ topic, partition, message }) => {
    //     if (message.value) {
    //       const parsedData = JSON.parse(message.value.toString());
    //       userId = parsedData._id;
    //     }
    //   },
    // });
    // console.log("UserID"+userId);

    const s3Response: any = await uploadS3Image(courseData.courseImage);
    if (s3Response.error) {
      console.error("Error uploading image to S3:", s3Response.error);

      throw new Error("Failed to upload image to S3");
    }

    console.log("URL of the image from the S3 bucket:", s3Response.Location);

    // Prepare course data for saving
    const courseDatas = {
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
  async courseSection(extractedData: any) :Promise<returnSection | null>{
    const { section1, userData, CourseId, videos } = extractedData;
    const { lessons } = section1;
    console.log("lessons", lessons);

    const videoUrls: any = [];

    for (const i in videos) {
      const s3Response: any = await uploadS3Video(videos[i]);
      if (s3Response.error) {
        console.error("Error uploading video to S3:", s3Response.error);
        throw new Error("Failed to upload video to S3");
      }
      console.log("URL of the video from the S3 bucket:", s3Response.Location);
      videoUrls.push(s3Response.Location);
    }
    // Create a new course document
    const newCourse: any = new CourseSection({
      title:section1.title,
      description: section1.description,
      lessons: lessons.map((lesson: any, index: any) => ({
        description: lesson.description,
        isFree: lesson.isFree,
        title: lesson.title,
        video: videoUrls[index],
      })),
      owner: userData._id,
      courseId: CourseId,
    });

    // Save the course document to MongoDB
    const newSection = await newCourse.save();
    console.log(
      "Course and videos successfully uploaded and saved.",
      newSection
    );
    const updatedCourse = await Course.findOneAndUpdate(
      { _id: CourseId },
      { $push: { sections: { sectionId: newSection._id } } },
      { new: true }
    );

    console.log(
      "Course and videos successfully uploaded and saved.",
      updatedCourse
    );
    return newSection ? newSection : null;

  }
}
