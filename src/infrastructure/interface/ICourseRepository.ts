
import { CourseType } from "../../application/interface/courseData";
import { CourseDocument } from "../database/Model/Course";
import { returnSection } from "../../domain/entities/sectionReturn";
export interface ICourseRepository {
     courseCreation(courseData:CourseType):Promise<CourseDocument | null>;
     courseSection(extractedData:any):Promise<returnSection | null>;
     
}
