import { Reque } from "../../domain/entities/checkUser";
import { Requesttype } from "../../domain/entities/requestReturn";
import { IBuyCourseRepository } from "../../infrastructure/interface/IBuyCourseRepository";
import { IBuyCourseUseCase } from "../interface/IBuyCourseUseCase";

export class buyCourseUseCase implements IBuyCourseUseCase{
    private respoistory: IBuyCourseRepository;
    constructor(respoistory: IBuyCourseRepository){
        this.respoistory = respoistory;
    }


    async buyCourse(order:any,values:Requesttype){
        const response = await this.respoistory.buyCourse(order,values);
        return response ? response: null;
    }
    async getCourseWithId(userId:string){
        const response = await this.respoistory.getCourseWithId(userId);
        return response ? response : null;
    }
    async getEnrolledCourseWithId(userId:string){
        const response = await this.respoistory.getEnrolledCourseWithId(userId);
        return response ? response : null;
    }
    async checkUserAccess(values:Reque){
        const response = await this.respoistory.checkUserAccess(values);
        return response ? response : null;
    }
    async enrolledUserDetails(userId:string){
        const response = await this.respoistory.enrolledUserDetails(userId);
        return response ? response : null;
    }
}