import { Request, Response, NextFunction } from "express";
import { IBuyCourseUseCase } from "../../application/interface/IBuyCourseUseCase";
import crypto from "crypto";
import { razorpayInstance } from "../../utils/razorpay";

export class BuyCourseController {
  private buyCourseUseCase: IBuyCourseUseCase;

  constructor(buyCourseUseCase: IBuyCourseUseCase) {
    this.buyCourseUseCase = buyCourseUseCase;
  }

  async buyCourse(req: Request, res: Response) {
    try {
      const values = req.body;
      const price = req.body.coursePrice;
      const options = {
        amount: Number(price * 100),
        currency: "INR",
        receipt: crypto.randomBytes(10).toString("hex"),
      };

      razorpayInstance.orders.create(options, async (error, order) => {
        if (error) {
          console.log("Razorpay order creation error:", error);
          return res.status(500).json({ message: "Something went wrong!" });
        }

        if (order) {
          try {
            const response = await this.buyCourseUseCase.buyCourse(
              order,
              values
            );
            res
              .status(200)
              .json({ message: "Course purchase successful", response });
          } catch (error) {
            console.error("Error in buyCourseUseCase:", error);
            res
              .status(500)
              .json({ message: "Error processing course purchase" });
          }
        }
      });
    } catch (error) {
      console.error("Unexpected error:", error);
      res.status(500).json({ message: "An unexpected error occurred" });
    }
  }

  async getCourseWithId(req: Request, res: Response) {
    try {
      const userId = req.params.id;
      const response = await this.buyCourseUseCase.getCourseWithId(userId);
      res
        .status(200)
        .json({ message: "Course fetched successfully", response });
    } catch (error) {
      console.error("Error fetching course:", error);
      res.status(500).json({ message: "Failed to fetch course" });
    }
  }

  async getEnrolledCourseWithId(req: Request, res: Response) {
    try {
      const userId = req.params.id;
      const response = await this.buyCourseUseCase.getEnrolledCourseWithId(
        userId
      );
      res
        .status(200)
        .json({ message: "Enrolled course fetched successfully", response });
    } catch (error) {
      console.error("Error fetching enrolled course:", error);
      res.status(500).json({ message: "Failed to fetch enrolled course" });
    }
  }

  async checkUserAccess(req: Request, res: Response) {
    try {
      const values = req.body;
      const dbResponse = await this.buyCourseUseCase.checkUserAccess(values);
      let value = "Not Enrolled";
      let owner = "Owner";
      if (dbResponse === value || dbResponse === owner) {
        res.status(200).json({ message: "Access found", response: dbResponse });
      } else {
        let Enrolled = "Enrolled";
        const response = { Enrolled, ...dbResponse };
        res.status(200).json({ message: "Access found", response });
      }
    } catch (error) {
      console.error("Error checking user access:", error);
      res.status(500).json({ message: "An unexpected error occurred" });
    }
  }
  async enrolledUserDetails(req: Request, res: Response) {
    try {
      const userId = req.params.id;
      const response = await this.buyCourseUseCase.enrolledUserDetails(userId);
      res
        .status(200)
        .json({
          message: "Enrolled user details fetched successfully",
          response,
        });
    } catch (error) {
      console.error("Error fetching enrolled user details:", error);
      res
        .status(500)
        .json({ message: "Failed to fetch enrolled user details" });
    }
  }
  async lessonCompleted(req: Request, res: Response){
    try {
      const values =   req.body;
      const resposne  = await this.buyCourseUseCase.lessonCompleted(values);
      res.status(200).json({message:"Lesson completed successfully", resposne})
    } catch (error) {
      console.error("Error fetching enrolled user details:", error);
      res
        .status(500)
        .json({ message: "Failed to Update Lesson Completion" });
    }

  }
}
