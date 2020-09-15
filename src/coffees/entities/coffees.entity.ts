import { Entity, Column, PrimaryGeneratedColumn } from "typeorm";

@Entity() // generates a sql table named 'coffee' based on the classname. if you prefer a different name other than the class name write it in the Entity parentheses
export class Coffee {
    @PrimaryGeneratedColumn() // indicates we want this value to be automatically incremented by the database
    id: number;

    @Column()
    brand: string;

    @Column('json', {nullable: true}) // indicates that the flavors should be stored as json and that they are optional with the nullable property
    flavors: string[];
}
