import { Module } from '@nestjs/common';
import { CoffeesController } from './coffees.controller';
import { CoffeesService } from './coffees.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Coffee } from './entities/coffees.entity';
import { Flavor } from './entities/flavor.entity';

@Module({ 
    imports: [TypeOrmModule.forFeature([Coffee, Flavor, Event])], // adds the entities to the coffee module for use
    controllers: [CoffeesController], 
    providers: [CoffeesService] 
}) 
export class CoffeesModule {}
