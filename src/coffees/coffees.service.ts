/**
 * Coffees Service
 * Services handle business logic and interactions with data services
 *
 */

import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { Coffee } from './entities/coffees.entity';
import { Flavors } from './coffees.data';

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
      throw new HttpException(
        `Coffee with id: ${id} not found.`,
        HttpStatus.NOT_FOUND,
      );
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

  addFlavor(id: number, flavor: string): Coffee {
    const coffee = this.findOne(id);
    coffee.flavors.push(flavor);
    return coffee;
  }

  create({ id, brand, flavors }: Coffee): Coffee[] {
    const coffee: Coffee = {
      id,
      brand,
      flavors,
    };

    this.coffees.push(coffee);
    return this.coffees;
  }

  remove(id: number): Coffee[] {
    const coffeetoRemove = this.findOne(id);
    if (!coffeetoRemove) {
      throw new HttpException(
        `Coffee with id: ${id} not found`,
        HttpStatus.NOT_FOUND,
      );
    }
    return this.coffees.filter(coffee => coffee.id !== coffeetoRemove.id);
  }
}
