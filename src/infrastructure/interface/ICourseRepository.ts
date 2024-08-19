import { CourseType } from "../../application/interface/courseData";
import { CourseDocument } from "../database/Model/Course";
import { returnSection } from "../../domain/entities/sectionReturn";
import { CourseDetails } from "../../domain/entities/courseDetails";
import { IisBlock } from "../../domain/entities/blockCourse";
import { UpdateCourseBody } from "../../domain/entities/UpdateCourse";
export interface ICourseRepository {
  courseCreation(courseData: CourseType): Promise<CourseDocument | null>;
  courseSection(extractedData: any): Promise<returnSection[] | null>;
  getAllCourse(): Promise<CourseDocument[] | null | undefined>;
  getCourseDetails(courseId: any): any;
  getAllEnrolledCourses(userId: string): any;
  getBlockDetails(values: IisBlock): any;
  deleteCourseDb(courseId: string): Promise<CourseDocument | null>;
  UpdateCourseDb(values: UpdateCourseBody): Promise<CourseDocument | null>;
}
