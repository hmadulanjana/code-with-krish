import {
  BadRequestException,
  Injectable,
  NotFoundException,
  OnModuleInit,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Product } from './entity/product.entity';
import { CreateProductDto } from './dto/create-product.dto';
import { Kafka } from 'kafkajs';
import { Redis } from 'ioredis';

@Injectable()
export class ProductsService implements OnModuleInit {
  private readonly redis = new Redis({ host: '3.0.159.213', port: 6379 });
  private readonly kafka = new Kafka({ brokers: ['3.0.159.213:9092'] });
  private readonly producer = this.kafka.producer();
  private readonly consumer = this.kafka.consumer({
    groupId: 'akila-inventory-service',
  });
  constructor(
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
  ) {}
  async onModuleInit() {
    await this.producer.connect();
    await this.consumer.connect();
    await this.consumerOrderCreated();
  }

  async createProduct(createProductDto: CreateProductDto): Promise<Product> {
    const product = this.productRepository.create(createProductDto);
    return this.productRepository.save(product);
  }

  async getProductById(id: number): Promise<Product> {
    const product = await this.productRepository.findOne({ where: { id } });
    if (!product) {
      throw new NotFoundException(`Product with ID ${id} not found`);
    }
    return product;
  }

  async getAllProducts(): Promise<Product[]> {
    return this.productRepository.find();
  }

  async validateStock(
    id: number,
    quantity: number,
  ): Promise<{ available: boolean }> {
    const product = await this.getProductById(id);
    return { available: product.quantity >= quantity };
  }
  async reduceStock(id: number, quantity: number): Promise<Product> {
    const product = await this.getProductById(id);
    if (product.quantity < quantity) {
      throw new BadRequestException(`Not enough stock for Product ID ${id}`);
    }
    product.quantity -= quantity;
    return this.productRepository.save(product);
  }

  async consumerOrderCreated() {
    await this.consumer.subscribe({ topic: 'akila.order.create' });
    await this.consumer.run({
      eachMessage: async ({ message }) => {
        console.log('New message arrived-------------------------------');
        const { customerId, city, customerName, items } = JSON.parse(
          message.value.toString(),
        );
        for (const item of items) {
          await this.reduceStock(item.productId, item.quantity);
        }

        //release the lock
        for (const item of items) {
          await this.redis.del(`akila:product:${item.productId}:lock`);
        }

        await this.producer.send({
          topic: 'akila.order.inventory.update',
          messages: [
            { value: JSON.stringify({ customerId, city, customerName, items }) },
          ],
        });
      },
    });
  }
}
