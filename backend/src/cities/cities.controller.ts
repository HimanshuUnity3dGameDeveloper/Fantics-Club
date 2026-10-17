import { Controller, Get, Param } from '@nestjs/common';
import { CitiesService } from './cities.service.js';

@Controller('cities')
export class CitiesController {
    constructor(private readonly citiesService: CitiesService) { }
    // GET /cities
    @Get()
    async getAllCities() {
        return this.citiesService.findAll();
    }
    // GET /cities/:slug
    @Get(':slug')
    async getCityBySlug(@Param('slug') slug: string) {
        return this.citiesService.findBySlug(slug);
    }
}
