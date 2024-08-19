import { UpdateCourseBody } from "../../domain/entities/UpdateCourse";
import { IisBlock } from "../../domain/entities/blockCourse";
import { CourseReturn } from "../../domain/entities/courseReturn";
import { returnSection } from "../../domain/entities/sectionReturn";
import { CourseDocument } from "../../infrastructure/database/Model/Course";
import { ICourseRepository } from "../../infrastructure/interface/ICourseRepository";
import { ReceivedData } from "../../presentation/controller/interface";
import { IcourseUsecase } from "../interface/IcourseUsecase";
import { CourseType } from "../interface/courseData";

export class courseUseCase implements IcourseUsecase {
  private repository: ICourseRepository;

  constructor(repository: ICourseRepository) {
    this.repository = repository;
  }

  async createCourse(courseData: CourseType): Promise<CourseReturn | null> {
    const returnCourse = await this.repository.courseCreation(courseData);
    return returnCourse ? returnCourse : null;
  }
  async createCourseSection(
    extractedData: any
  ): Promise<returnSection[] | null> {
    const returnSection = await this.repository.courseSection(extractedData);
    return returnSection ? returnSection : null;
  }
  async getallCourse(): Promise<CourseDocument[] | null | undefined> {
    const getCourse = await this.repository.getAllCourse();
    return getCourse ? getCourse : null;
  }
  async getCourseDetails(courseId: any): Promise<any> {
    const getCourseDetails = await this.repository.getCourseDetails(courseId);
    return getCourseDetails ? getCourseDetails : null;
  }
  async blockCourse(values: IisBlock): Promise<any> {
    const getBlockDetails = await this.repository.getBlockDetails(values);
    return getBlockDetails ? getBlockDetails : null;
  }
  async getAllEnrolledCourses(userId: string) {
    const getAllEnrolledDb = await this.repository.getAllEnrolledCourses(
      userId
    );
    return getAllEnrolledDb ? getAllEnrolledDb : null;
  }
  async deleteCourse(courseId: string) {
    const dbresponse = await this.repository.deleteCourseDb(courseId);
    return dbresponse ? dbresponse : null;
  }
  async updateCourse(Values: UpdateCourseBody) {
    const getAllEnrolledDb = await this.repository.UpdateCourseDb(Values);
    return getAllEnrolledDb ? getAllEnrolledDb : null;
  }
}
