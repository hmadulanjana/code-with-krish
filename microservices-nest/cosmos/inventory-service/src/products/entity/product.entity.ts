import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Product {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('varchar')
  name: String;

  @Column('decimal')
  price: number;
  
  @Column()
  quantity: number;
}
