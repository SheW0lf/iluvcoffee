import { Module } from '@nestjs/common';
import { CoffeesController } from './coffees.controller';
import { CoffeesService } from './coffees.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Coffee } from './entities/coffees.entity';

@Module({ 
    imports: [TypeOrmModule.forFeature([Coffee])], // adds the coffee entity to the coffee module for use
    controllers: [CoffeesController], 
    providers: [CoffeesService] 
}) 
export class CoffeesModule {}
