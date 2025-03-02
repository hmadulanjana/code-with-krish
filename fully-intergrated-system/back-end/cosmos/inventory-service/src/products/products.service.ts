import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from './entity/product.entity';
import { Repository } from 'typeorm';
import { CreateProductDto } from './dto/create-product.dto';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product) private productRepository: Repository<Product>,
  ) {}

  async create(createProductDto: CreateProductDto): Promise<Product | null> {

    const product = this.productRepository.create(createProductDto);

    const saveProduct = await this.productRepository.save(product);

    return this.productRepository.findOne({ where: { id: saveProduct.id } });
  }

  async getProduct(id: any) {
    const product = await this.productRepository.findOne({ where: { id: id } });

    if (!product) {
      throw new NotFoundException(`Product with id: ${id} not found`);
    }
    return product;
  }

  async getAll() {
    const products = await this.productRepository.find();
    if (!products) {
      throw new NotFoundException(`No products records found`);
    }
    return products;
  }

  async validateProduct(id: number, quantity: number){
    const product = await this.productRepository.findOne({ where: { id: id } });

    if (!product) {
      throw new NotFoundException(`Product with id: ${id} not found`);
    }
    return { available: product ? product.quantity >= quantity : false };
  }

  async updateProductQuantity(id: number, quantity: number) {
    const product = await this.productRepository.findOne({ where: { id } });
    if (!product) {
      throw new NotFoundException(`Product with id: ${id} not found`);
    }
    product.quantity -= quantity;
    return this.productRepository.save(product);
  }
}
