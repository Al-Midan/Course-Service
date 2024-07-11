
import { IisBlock } from "../../domain/entities/blockCourse";
import { CourseReturn } from "../../domain/entities/courseReturn";
import { returnSection } from "../../domain/entities/sectionReturn";
import { CourseDocument } from "../../infrastructure/database/Model/Course";
// import { ReceivedData } from "../../presentation/controller/interface";
import { CourseType } from "./courseData";

export interface IcourseUsecase {
    createCourse(userData:CourseType):Promise<CourseReturn | null>;
    createCourseSection(extractedData:any):Promise<returnSection[] | null>;
    getallCourse():Promise<CourseDocument[] | null | undefined>
    getCourseDetails(courseId:any):any;
    blockCourse(Values:IisBlock):any;
}
