import { KafkaModule } from "../../../utils/kafka/kafkaModule";

class KafkaProducer extends KafkaModule {
  constructor() {
    // super('course-service-producer', ['localhost:9092']);
    super("user-service-producer", ["kafka:29092"]);
  }

  async sendEnrolledCoursesResponse(
    userId: string,
    courses: any
  ): Promise<void> {
    await this.sendMessage("enrolled-courses-response", userId, {
      userId,
      courses,
    });
  }
}

export const kafkaProducer = new KafkaProducer();

// Export the function separately
export const sendEnrolledCoursesResponse = (userId: string, courses: any) =>
  kafkaProducer.sendEnrolledCoursesResponse(userId, courses);
