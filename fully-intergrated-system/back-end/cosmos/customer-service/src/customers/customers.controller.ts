import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { CustomersService } from './customers.service';
import { CreateCustomerDto } from './dto/create-customer.dto';

@Controller('customers')
export class CustomersController {constructor(private customerService: CustomersService) {}

  @Post()
  async create(@Body() createCustomerDto: CreateCustomerDto) {
    return this.customerService.create(createCustomerDto);
  }
  @Get(':id')
  async getCustomer(@Param('id') id: number) {
    return this.customerService.getCustomer(id);
  }
  @Get()
  async getAll() {
    return await this.customerService.getAll();
  }
}
