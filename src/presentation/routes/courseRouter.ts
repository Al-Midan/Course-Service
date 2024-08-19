import express from "express";
import { courseController } from "../controller/courseController";
import { CourseRepository } from "../../infrastructure/repository/courseRepository";
import { courseUseCase } from "../../application/useCase/courseUsecase";
import multer from "multer";
const router = express.Router();
const upload = multer();

const repository = new CourseRepository();
const course = new courseUseCase(repository);
const controller = new courseController(course);
router.post(
  "/createCourse",
  upload.single("courseImage"),
  controller.createCourse.bind(controller)
);
router.post(
  "/createSection",
  upload.any(),
  controller.createSection.bind(controller)
);
router.get("/getCourse", controller.getCourse.bind(controller));
router.get("/getallCourse", controller.getAllCourse.bind(controller));
router.get(
  "/getCourseDetails/:courseId",
  controller.getCourseDetails.bind(controller)
);
router.put("/blockCourse/:courseId", controller.blockCourse.bind(controller));
router.delete("/deleteCourse/:id", controller.deleteCourse.bind(controller));
router.put("/courseEdit/:courseId", controller.updateCourse.bind(controller));
export const handleEnrolledCoursesRequest =
  controller.handleEnrolledCoursesRequest.bind(controller);
export default router;
