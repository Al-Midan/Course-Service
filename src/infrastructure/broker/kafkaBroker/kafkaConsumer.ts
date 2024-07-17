import { KafkaModule } from "../../../utils/kafka/kafkaModule";
import { handleEnrolledCoursesRequest } from "../../../presentation/routes/courseRouter";

class KafkaConsumer extends KafkaModule {
  constructor() {
    super('course-service-consumer', ['localhost:9092']);
  }

  async consumeEnrolledCoursesRequests(): Promise<void> {
    await this.connect();
    await this.subscribeToTopic('enrolled-courses-request');
    await this.runConsumer(async (message) => {
      const messageData = JSON.parse(message.value!.toString());
      await handleEnrolledCoursesRequest(messageData.userId);
    });
  }
}

const kafkaConsumer = new KafkaConsumer();
export const consumeEnrolledCoursesRequests = () => kafkaConsumer.consumeEnrolledCoursesRequests();