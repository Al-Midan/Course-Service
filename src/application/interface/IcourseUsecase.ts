
import { CourseReturn } from "../../domain/entities/courseReturn";
import { returnSection } from "../../domain/entities/sectionReturn";
import { ReceivedData } from "../../presentation/controller/interface";
import { CourseType } from "./courseData";

export interface IcourseUsecase {
    createCourse(userData:CourseType):Promise<CourseReturn | null>;
    createCourseSection(extractedData:any):Promise<returnSection | null>;
}
