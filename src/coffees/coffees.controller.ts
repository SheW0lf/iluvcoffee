import {
    Controller,
    Get,
    Param,
    Post,
    Body,
    Patch,
    Delete,
    ParseIntPipe,
    Query,
} from '@nestjs/common';
import { CoffeesService } from './coffees.service';
import { Coffee } from './entities/coffees.entity';
import { CreateCoffeeDto } from './dto/create-coffee.dto';
import { UpdateCoffeeDto } from './dto/update-coffee.dto';
import { PaginationQueryDto } from 'src/common/dto/pagination-query.dto';

interface Query {
    limit: number;
    offset: number;
}

@Controller('coffees')
export class CoffeesController {
    // injecting the CoffeesService in the controller. Note that it is private and readonly to provide immutability
    constructor(private readonly coffeesService: CoffeesService) {}

    @Get()
    findAll(@Query() paginationQuery: PaginationQueryDto): Promise<Coffee[]> {
        return this.coffeesService.findAll(paginationQuery);
    }


    @Get(':id')
    findOne(@Param('id', ParseIntPipe) id: number): Promise<Coffee> {
        return this.coffeesService.findOne(id);
    }

    // @Post()
    // //set specific http status on a route. In Postman, this will show up under the 'status' property. because of this it will always return 410: GONE
    // // @HttpCode(HttpStatus.GONE)
    // create(@Body() body: string): string {
    //   return body;
    // }

    @Post()
    create(@Body() coffeeData: CreateCoffeeDto): Promise<Coffee> {
        return this.coffeesService.create(coffeeData);
    }

    @Patch(':id')
    update(
        @Param('id') id: number,
        @Body() coffeeData: UpdateCoffeeDto,
    ): Promise<Coffee> {
        return this.coffeesService.update(id, coffeeData);
    }

    @Delete(':id')
    remove(@Param('id') id: number): Promise<Coffee> {
        return this.coffeesService.remove(id);
    }
}
