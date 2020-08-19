/**
 * Coffees Service
 * Services handle business logic and interactions with data services
 *
 */

import { Injectable, NotFoundException } from '@nestjs/common';
import { Coffee } from './entities/coffees.entity';
import { Flavors } from './coffees.data';
import { v4 as uuidv4 } from 'uuid';
import { CreateCoffeeDto } from './dto/create-coffee.dto';
import { UpdateCoffeeDto } from './dto/update-coffee.dto';

// any class with the Injectable decorator becomes a provider in app.module.ts.
// Run nest g s in console to create a provider. (> nest generate service)
@Injectable()
export class CoffeesService {
    private coffees: Coffee[] = Flavors;

    findAll(): Coffee[] {
        return this.coffees;
    }

    findOne(id: number): Coffee {
        const coffee = this.coffees.find(coffee => coffee.id === id);
        if (!coffee) {
            throw new NotFoundException(`Coffee with id: ${id} not found.`);
        }
        return coffee;
    }

    getAllFlavors(): string[] {
        const flavors = [];
        this.coffees.map(coffee => {
            flavors.push(coffee.flavors);
        });
        return [...new Set(flavors.flat())]; // returns an array of unique values from flavors
    }

    update(id: number, { brand, flavors }: UpdateCoffeeDto): Coffee {
        const coffee = this.findOne(id);
        brand ? (coffee.brand = brand) : coffee.brand;
        flavors
            ? flavors.map(flavor => coffee.flavors.push(flavor))
            : coffee.flavors;
        return coffee;
    }

    create({ brand, flavors }: CreateCoffeeDto): Coffee {
        const coffee: Coffee = {
            id: uuidv4(),
            brand,
            flavors,
        };

        this.coffees.push(coffee);
        return coffee;
    }

    remove(id: number): Coffee[] {
        const coffeetoRemove = this.findOne(id);
        if (!coffeetoRemove) {
            throw new NotFoundException(`Coffee with id: ${id} not found`);
        }
        return this.coffees.filter(coffee => coffee.id !== coffeetoRemove.id);
    }
}
