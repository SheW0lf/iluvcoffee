import { Entity, Column, PrimaryGeneratedColumn, JoinTable, ManyToMany } from "typeorm";
import { Flavor } from "./flavor.entity";

@Entity() // generates a sql table named 'coffee' based on the classname. if you prefer a different name other than the class name write it in the Entity parentheses
export class Coffee {
    @PrimaryGeneratedColumn() // indicates we want this value to be automatically incremented by the database
    id: number;

    @Column()
    brand: string;

    @JoinTable()
    @ManyToMany(type => Flavor, flavor => flavor.coffees)
    flavors: string[];
}
