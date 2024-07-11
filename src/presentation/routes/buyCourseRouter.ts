import express from "express";
import { BuyCourseController } from "../controller/buyCourseController";
import { buyCourseRepoistory } from "../../infrastructure/repository/buyCourseRepository";
import { buyCourseUseCase } from "../../application/useCase/buyCourseUsecase";
const secondRouter = express.Router();

const repository = new buyCourseRepoistory();
const course = new buyCourseUseCase(repository);
const controller = new BuyCourseController(course);
secondRouter.post('/buyCourse',controller.buyCourse.bind(controller))
secondRouter.get('/getCourseWithId/:id',controller.getCourseWithId.bind(controller))
secondRouter.get('/getEnrolledCourseWithId/:id',controller.getEnrolledCourseWithId.bind(controller))
secondRouter.post('/checkUserAccess',controller.checkUserAccess.bind(controller))
secondRouter.get('/enrolledUserDetails/:id',controller.enrolledUserDetails.bind(controller))

export default secondRouter;
