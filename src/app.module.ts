import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CoffeesModule } from './coffees/coffees.module';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [CoffeesModule, TypeOrmModule.forRoot({
    type: 'postgres', // type of database
    host: 'localhost', // host name. Localhost since this is in local dev
    port: 5432, // external port database is running on. see docker-compose.yml
    username: 'postgres', // default username for postgres databases. can also set one in the docker-compose file
    password: 'pass123', // password. see docker-compose.yml
    database: 'test', // set database name
    autoLoadEntities: true, // loads modules automatically without specifying the entities array
    synchronize: true // ensures the TypeORM entities are synchronized with the database. This needs to be disabled in prod
  })],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
