import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Customer } from './entity/customer.entity';
import { Repository } from 'typeorm';
import { CreateCustomerDto } from './dto/create-customer.dto';

@Injectable()
export class CustomersService {
  constructor(
    @InjectRepository(Customer)
    private customerRepositary: Repository<Customer>,
  ) {}

  async create(createCustomerDto: CreateCustomerDto): Promise<Customer | null> {
    const existingCustomer = await this.customerRepositary.findOne({where: { email: createCustomerDto.email }});

    if (existingCustomer) {
      throw new BadRequestException('Email already exists');
    }

    const customer = this.customerRepositary.create(createCustomerDto);

    const saveCustomer = await this.customerRepositary.save(customer);

    return this.customerRepositary.findOne({
      where: { id: saveCustomer.id },
    });
  }

  async getCustomer(id: any) {
    const customer = await this.customerRepositary.findOne({ where: { id: id } });

    if (!customer) {
      throw new NotFoundException(`Customer with id: ${id} not found`);
    }
    return customer;
  }

  async getAll() {
    const customers = await this.customerRepositary.find();
    if (!customers) {
      throw new NotFoundException(`No customer records found`);
    }
    return customers;
  }
}
