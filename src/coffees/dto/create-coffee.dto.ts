// DTOs are similar to interfaces, and are used to describe the response object expected from the request

import { IsString } from 'class-validator';

export class CreateCoffeeDto {
    @IsString()
    readonly brand: string;

    @IsString({ each: true })
    readonly flavors: string[];
}
