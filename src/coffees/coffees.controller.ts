import {
  Controller,
  Get,
  Param,
  Post,
  Body,
  Patch,
  Delete,
} from '@nestjs/common';

@Controller('coffees')
export class CoffeesController {
  @Get('flavors') // route: GET coffees/flavors
  findAll(): string {
    return 'returns all coffees';
  }

  @Get(':id')
  findOne(@Param('id') id: number): string {
    return `returns a coffee with id: ${id}`;
  }

  @Post()
  // @HttpCode(HttpStatus.GONE) set specific http status on a route. In Postman, this will show up under the 'status' property. because of this it will always return 410: GONE
  create(@Body() body: string): string {
    return body;
  }

  @Patch(':id')
  update(@Param('id') id: number, @Body() body): string {
    return `updated coffee at id: ${id}`;
  }

  @Delete(':id')
  remove(@Param('id') id: number) {
    return `deleted coffee at id: ${id}`;
  }
}
