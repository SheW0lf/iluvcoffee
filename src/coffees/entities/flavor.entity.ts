import { PrimaryGeneratedColumn, Column, ManyToMany } from "typeorm";
import { Coffee } from "./coffees.entity";

export class Flavor {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @ManyToMany(type => Coffee, coffee => coffee.flavors)
    coffees: Coffee[]
}
