import { Body, Controller, Get, Param, Patch, Post, SetMetadata, UseGuards } from '@nestjs/common';
import { createOrderDto } from './dto/create-order.dto';
import { OrdersService } from './orders.service';
import { Order } from './entity/order.entity';
import { UpdateOrderStatus } from './dto/update-order.dto';
import { PermissionsGuard } from '../auth/permissions.guard';
import { AuthGuard } from '@nestjs/passport';

@Controller('orders')
export class OrdersController {
  constructor(private ordersService: OrdersService) {}

  @Post()
  async create(@Body() createOrderDto: createOrderDto): Promise<Order> {
    return await this.ordersService.create(createOrderDto);
  }
  @Get(':id')
  @UseGuards(AuthGuard('jwt'), PermissionsGuard)
  @SetMetadata('permissions', 'order:read') 
  async fetch(@Param('id') id: number) {
    return await this.ordersService.fetch(id);
  }
  @Get()
  async fetchAll() {
    return await this.ordersService.fetchAll();
  }
  @Patch(':id/status')
  async updateOrderStatus(
    @Param('id') id: number,
    @Body() updateOrderStatus: UpdateOrderStatus,
  ) {
    return await this.ordersService.updateOrderStaus(id, updateOrderStatus);
  }
}
