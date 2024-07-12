import { Reque } from "../../domain/entities/checkUser";
import { lessonType } from "../../domain/entities/lessonType";
import { Requesttype } from "../../domain/entities/requestReturn";

export interface IBuyCourseUseCase{
    buyCourse(order:any,values:Requesttype):any;
    getCourseWithId(userId:string):any;
    getEnrolledCourseWithId(userId:string):any;
    checkUserAccess(values: Reque): any;
    enrolledUserDetails(userId:string):any;
    lessonCompleted(values:lessonType):any;
}