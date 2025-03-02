import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Order } from './entity/order.entity';
import { Repository } from 'typeorm';
import { OrderItem } from './entity/order-item.entity';
import { CreateOrderDto } from './dto/create-order.dto';
import { OrderStatus, UpdateOrderStatus } from './dto/update-order.dto';
import { HttpService } from '@nestjs/axios';
import { lastValueFrom } from 'rxjs';
import { response } from 'express';

@Injectable()
export class OrdersService {
  private readonly inventoryServiceUrl = 'http://localhost:3001/products';
  private readonly customerServiceUrl = 'http://localhost:3002/customers';

  constructor(
    @InjectRepository(Order)
    private readonly orderRepository: Repository<Order>,
    @InjectRepository(OrderItem)
    private readonly orderItemsRepository: Repository<OrderItem>,
    private readonly httpService: HttpService,
  ) {}

  async create(createOrderDto: CreateOrderDto): Promise<{ customerDetails: any; orderDetails: Order | null }> {
    const { customerId, items } = createOrderDto;
    let customerDetails

    try {
      const response$ = this.httpService.get(
        `${this.customerServiceUrl}/${customerId}`,
      );
      const response = await lastValueFrom(response$);
      customerDetails = response.data

      if (!response) {
        throw new BadRequestException(
          `Customer ID ${customerId} not found or unavailable.`,
        );
      }
    } catch (error) {
      let errorMessage = `Error checking customer ID ${customerId}: ${error.message}`;

      if (
        error.response &&
        error.response.data &&
        error.response.data.message
      ) {
        errorMessage = `Error checking customer ID ${customerId}: ${error.response.data.message}`;
      }
      throw new BadRequestException(errorMessage);
    }

    for (const item of items) {
      try {
        const response$ = this.httpService.get(
          `${this.inventoryServiceUrl}/${item.productId}/validate?quantity=${item.quantity}`,
        );
        const response = await lastValueFrom(response$);
        if (!response.data.available) {
          throw new BadRequestException(
            `Product ID ${item.productId} is out of stock.`,
          );
        }
      } catch (error) {
        let errorMessage = `Error checking stock for Product ID ${item.productId}: ${error.message}`;

        if (
          error.response &&
          error.response.data &&
          error.response.data.message
        ) {
          errorMessage = `Error checking stock for Product ID ${customerId}: ${error.response.data.message}`;
        }
        throw new BadRequestException(errorMessage);
      }
    }

    const order = this.orderRepository.create({
      customerId,
      status: 'PENDING',
    });

    const saveOrder = await this.orderRepository.save(order);

    const orderItems = items.map((item) =>
      this.orderItemsRepository.create({
        productId: item.productId,
        price: item.price,
        quantity: item.quantity,
        order: saveOrder,
      }),
    );

    await this.orderItemsRepository.save(orderItems);

    const orderDetails = await this.orderRepository.findOne({
      where: { id: saveOrder.id },
      relations: ['items'],
    });

    for (const item of items) {
      try {
        await lastValueFrom(
          this.httpService.patch(
            `${this.inventoryServiceUrl}/${item.productId}/reduce?quantity=${item.quantity}`,
          ),
        );
      } catch (error) {
        let errorMessage = `Error checking stock for Product ID ${item.productId}: ${error.message}`;

        if (
          error.response &&
          error.response.data &&
          error.response.data.message
        ) {
          errorMessage = `Error checking stock for Product ID ${customerId}: ${error.response.data.message}`;
        }
        throw new BadRequestException(errorMessage);
      }
    }

    return {customerDetails, orderDetails};
  }

  async fetch(id: any) {
    const order = await this.orderRepository.findOne({
      where: { id: id },
      relations: ['items'],
    });

    if (!order) {
      throw new NotFoundException(`Order with id: ${id} not found`);
    }

    try {
      const response$ = this.httpService.get(
        `${this.customerServiceUrl}/${order.customerId}`,
      );
      const response = await lastValueFrom(response$);
      if (!response) {
        throw new BadRequestException(
          `Customer ID ${order.customerId} not found or unavailable.`,
        );
      }
    } catch (error) {
      let errorMessage = `Error checking customer ID ${order.customerId}: ${error.message}`;

      if (
        error.response &&
        error.response.data &&
        error.response.data.message
      ) {
        errorMessage = `Error checking customer ID ${order.customerId}: ${error.response.data.message}`;
      }
      throw new BadRequestException(errorMessage);
    }

    const orderWithCustomer = [order, response];
    return orderWithCustomer;
  }

  async fetchAll() {
    return await this.orderRepository.find({
      relations: ['items'],
    });
  }

  async updateOrderStatus(id: number, updateOrderStatus: UpdateOrderStatus) {
    const order = await this.orderRepository.findOne({ where: { id } });
    if (!order) {
      throw new NotFoundException(`Order with id: ${id} not found`);
    }

    if (
      order.status === OrderStatus.DELIVERED ||
      order.status === OrderStatus.CANCELED
    ) {
      throw new BadRequestException(
        `Order status can't be change when its delivered or cancelled`,
      );
    }

    order.status = updateOrderStatus.status;
    return this.orderRepository.save(order);
  }
}
