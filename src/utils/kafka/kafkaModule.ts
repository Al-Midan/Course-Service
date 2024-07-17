import { Kafka, Producer, Consumer, KafkaMessage } from 'kafkajs';

export class KafkaModule {
  protected kafka: Kafka;
  protected producer: Producer;
  protected consumer: Consumer;

  constructor(clientId: string, brokers: string[]) {
    this.kafka = new Kafka({ clientId, brokers });
    this.producer = this.kafka.producer();
    this.consumer = this.kafka.consumer({ groupId: `${clientId}-group` });
  }

  async connect(): Promise<void> {
    await this.producer.connect();
    await this.consumer.connect();
  }

  async disconnect(): Promise<void> {
    await this.producer.disconnect();
    await this.consumer.disconnect();
  }

  async sendMessage<T>(topic: string, key: string, value: T): Promise<void> {
    await this.producer.send({
      topic,
      messages: [{ key, value: JSON.stringify(value) }],
    });
  }

  protected async subscribeToTopic(topic: string): Promise<void> {
    await this.consumer.subscribe({ topic, fromBeginning: true });
  }

  protected async runConsumer(eachMessage: (message: KafkaMessage) => Promise<void>): Promise<void> {
    await this.consumer.run({
      eachMessage: async ({ message }) => {
        await eachMessage(message);
      },
    });
  }
}