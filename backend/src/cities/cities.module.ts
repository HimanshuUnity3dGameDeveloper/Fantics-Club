import { Module } from '@nestjs/common';
import { CitiesController } from './cities.controller.js';
import { CitiesService } from './cities.service.js';
import { MongooseModule } from '@nestjs/mongoose';
import { CitySchema } from './city.model.js';
@Module({
  imports: [MongooseModule.forFeature([{ name: 'City', schema: CitySchema }])],
  controllers: [CitiesController],
  providers: [CitiesService],
  exports: [CitiesService, MongooseModule],
})
export class CitiesModule { }
