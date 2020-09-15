/**
 * Coffees Service
 * Services handle business logic and interactions with data services
 *
 */

import { Injectable, NotFoundException } from '@nestjs/common';
import { Coffee } from './entities/coffees.entity';
import { CreateCoffeeDto } from './dto/create-coffee.dto';
import { UpdateCoffeeDto } from './dto/update-coffee.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

// any class with the Injectable decorator becomes a provider in app.module.ts.
// Run nest g s in console to create a provider. (> nest generate service)
@Injectable()
export class CoffeesService {
    constructor(
        @InjectRepository(Coffee) //injects the coffee repository from the database for use instead of the hardcoded data
        private readonly coffeeRepository: Repository<Coffee> //sets up the coffeeRepository variable from the Coffee repository data. Repository comes with a lot of very helpful CRUD methods
    ){}

    async findAll(): Promise<Coffee[]>{
        return await this.coffeeRepository.find();
    }

    async findOne(id: number): Promise<Coffee> {
        const coffee = await this.coffeeRepository.findOne(id)
        if (!coffee) {
            throw new NotFoundException(`Coffee with id: ${id} not found.`);
        }
        return coffee;
    }

    async update(id: number, updatedInfo: UpdateCoffeeDto): Promise<Coffee>{
        const coffee = await this.coffeeRepository.preload({
            id: +id,
            ...updatedInfo
        });

        if(!coffee){
            throw new NotFoundException(`Coffee #${id} not found`)
        }
        return this.coffeeRepository.save(coffee);
    }

    async create({ brand, flavors }: CreateCoffeeDto): Promise<Coffee> {
        const coffee = await this.coffeeRepository.create({brand, flavors});
        return this.coffeeRepository.save(coffee);
    }

    async remove(id: number): Promise<Coffee>{
        const coffee = await this.findOne(id); // findOne will automatically throw an error if the id does not exist. 
        return this.coffeeRepository.remove(coffee);
    }
}
