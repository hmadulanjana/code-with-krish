import { Injectable, NotFoundException, OnModuleInit } from '@nestjs/common';
import { Dispatch } from './entity/dispatcher.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Kafka } from 'kafkajs';
import Redis from 'ioredis';
import { DispatcherDto } from './dto/create-dispatcher.dto';

@Injectable()
export class DispatcherService implements OnModuleInit {
  private readonly redis = new Redis({ host: '3.0.159.213', port: 6379 });
  private readonly kafka = new Kafka({ brokers: ['3.0.159.213:9092'] });
  private readonly producer = this.kafka.producer();
  private readonly consumer = this.kafka.consumer({
    groupId: 'akila-dispatcher-service',
  });

  constructor(
    @InjectRepository(Dispatch)
    private readonly dispatcherRepository: Repository<Dispatch>,
  ) {}

  async onModuleInit() {
    await this.consumeConfirmedOrder();
  }

  async createdispatch(dispatcherDto: DispatcherDto): Promise<Dispatch> {
    const dispatch = this.dispatcherRepository.create(dispatcherDto);
    return this.dispatcherRepository.save(dispatch);
  }

  async getVehicleByCity(city: string): Promise<Dispatch[]> {
    return await this.dispatcherRepository.find({ where: { city } });
  }

  async consumeConfirmedOrder() {
    console.log(
      '---------------------------------dispatcher------------------------------',
    );
    await this.consumer.subscribe({
      topic: 'akila.order.comfirmed',
      fromBeginning: true,
    });
    await this.consumer.run({
      eachMessage: async ({ message }) => {
        console.log(
          '---------------------------------New order confirmed arrived dispatcher------------------------------',
        );
        const { city, orderId } = JSON.parse(message.value?.toString() || '{}');
        console.log(city);
        const dispatcher = await this.dispatcherRepository.find({
          where: { city },
        });

        console.log(dispatcher);
        
        if (!dispatcher) {
            console.log(dispatcher);
          throw new NotFoundException(`Cannot find vehicle for order ${orderId}`);
        }
      },
    });
  }
}
