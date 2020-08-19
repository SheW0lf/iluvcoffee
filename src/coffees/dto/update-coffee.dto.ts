import { IsString } from 'class-validator';
import { PartialType } from '@nestjs/mapped-types';
import { CreateCoffeeDto } from './create-coffee.dto';

// Partial type marks all fields in CreateCoffeeDto optional and sets it to UpdateCoffeeDto
export class UpdateCoffeeDto extends PartialType(CreateCoffeeDto) {}
