import { CourseReturn } from "../../domain/entities/courseReturn";
import { returnSection } from "../../domain/entities/sectionReturn";
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
  async createCourseSection(extractedData:any):Promise<returnSection | null>{
    const returnSection = await this.repository.courseSection(extractedData);
    return returnSection ? returnSection : null;
  }
}
