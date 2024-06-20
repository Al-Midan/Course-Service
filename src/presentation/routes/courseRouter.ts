import express from "express";
import { courseController } from "../controller/courseController";
import { CourseRepository } from "../../infrastructure/repository/courseRepository";
import { courseUseCase } from "../../application/useCase/courseUsecase";
import multer from 'multer';
const router = express.Router();
const upload = multer();

const repository = new CourseRepository();
const user = new courseUseCase(repository);
const controller = new courseController(user);
router.post('/createCourse',upload.single('courseImage'),controller.createCourse.bind(controller));
router.post('/createSection', upload.any(),controller.createSection.bind(controller));
export default router;
