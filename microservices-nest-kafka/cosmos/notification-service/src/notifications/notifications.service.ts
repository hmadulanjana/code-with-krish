import { Injectable, OnModuleInit } from '@nestjs/common';
import { Kafka } from 'kafkajs';

@Injectable()
export class NotificationsService implements OnModuleInit {
  private readonly kafka = new Kafka({ brokers: ['localhost:9092'] });
  private readonly producer = this.kafka.producer();
  private readonly consumer = this.kafka.consumer({
    groupId: 'akila-notification-service',
  });

  async onModuleInit() {
    await this.consumerNotificationCreated();
  }

  async consumerNotificationCreated() {
    await this.consumer.subscribe({ topic: 'akila.order.notification', fromBeginning: true });
    await this.consumer.run({
      eachMessage: async ({ message }) => {
        console.log('New message arrived to the notification-------------------------------');
        const response = JSON.parse(message.value?.toString() || '{}');
        
        console.log(`Sending notification to customer ${response.customerId}: ${response.status}`);
      },
    });
  }
}
