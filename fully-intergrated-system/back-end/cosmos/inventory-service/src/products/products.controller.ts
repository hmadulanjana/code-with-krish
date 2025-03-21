import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';

@Controller('products')
export class ProductsController {
  constructor(private productService: ProductsService) {}

  @Post()
  async create(@Body() createProductDto: CreateProductDto) {
    return this.productService.create(createProductDto);
  }
  @Get(':id')
  async getCustomer(@Param('id') id: number) {
    return this.productService.getProduct(id);
  }
  @Get()
  async getAll() {
    return await this.productService.getAll();
  }
  @Get(':id/validate')
  async validateProduct(
    @Param('id') id: number,
    @Query('quantity') quantity: number,
  ) {
    return this.productService.validateProduct(id, quantity);
  }

  @Patch(':id/reduce')
  async updateProductQuantity(
    @Param('id') id: number,
    @Query('quantity') quantity: number,
  ) {
    return this.productService.updateProductQuantity(id, quantity);
  }
}
