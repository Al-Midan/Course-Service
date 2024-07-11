import { Reque } from "../../domain/entities/checkUser";
import { Requesttype } from "../../domain/entities/requestReturn";

export interface IBuyCourseRepository{
    buyCourse(order:any,values:Requesttype):any;
    getCourseWithId(userId:string):any;
    getEnrolledCourseWithId(userId:string):any;
    checkUserAccess(values: Reque): Promise<string|null>
    enrolledUserDetails(userId:string):any;
}