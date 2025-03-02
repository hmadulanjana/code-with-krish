import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Customer {
    @PrimaryGeneratedColumn()
    id: number;

    @Column('varchar')
    name: String;

    @Column('varchar')
    email: String;
    
    @Column('varchar')
    address: String

}