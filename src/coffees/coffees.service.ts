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
import { Flavor } from './entities/flavor.entity';

// any class with the Injectable decorator becomes a provider in app.module.ts.
// Run nest g s in console to create a provider. (> nest generate service)
@Injectable()
export class CoffeesService {
    constructor(
        @InjectRepository(Coffee) //injects the coffee repository from the database for use instead of the hardcoded data
        private readonly coffeeRepository: Repository<Coffee>, //sets up the coffeeRepository variable from the Coffee repository data. Repository comes with a lot of very helpful CRUD methods
        @InjectRepository(Flavor)
        private readonly flavorRepository: Repository<Flavor>
    ){}

    private async preloadFlavorByName(name: string): Promise<Flavor>{
        const existingFlavor = await this.flavorRepository.findOne({name})
        if(existingFlavor){
            return existingFlavor
        }
        return this.flavorRepository.create({name})
    }

    async findAll(): Promise<Coffee[]>{
        return await this.coffeeRepository.find({
            relations: ['flavors']
        });
    }

    async findOne(id: number): Promise<Coffee> {
        const coffee = await this.coffeeRepository.findOne(id, { relations: ['flavors']})
        if (!coffee) {
            throw new NotFoundException(`Coffee with id: ${id} not found.`);
        }
        return coffee;
    }

    async update(id: number, updatedInfo: UpdateCoffeeDto): Promise<Coffee>{
        const flavors = updatedInfo.flavors && (await Promise.all(updatedInfo.flavors.map(name => this.preloadFlavorByName(name))))
        const coffee = await this.coffeeRepository.preload({
            id: +id,
            ...flavors
        });

        if(!coffee){
            throw new NotFoundException(`Coffee #${id} not found`)
        }
        return this.coffeeRepository.save(coffee);
    }

    async create(coffeeInfo: CreateCoffeeDto): Promise<Coffee> {
        const flavors = await Promise.all(coffeeInfo.flavors.map(name => this.preloadFlavorByName(name)))

        const coffee = await this.coffeeRepository.create({...coffeeInfo, flavors});
        return this.coffeeRepository.save(coffee);
    }

    async remove(id: number): Promise<Coffee>{
        const coffee = await this.findOne(id); // findOne will automatically throw an error if the id does not exist. 
        return this.coffeeRepository.remove(coffee);
    }
}
