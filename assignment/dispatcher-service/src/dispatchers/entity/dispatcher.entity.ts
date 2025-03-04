import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Dispatch {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  vehicle_number: string;
  @Column()
  city: string;

}