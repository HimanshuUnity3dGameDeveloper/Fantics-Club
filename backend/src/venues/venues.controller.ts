import { Controller, Get, Query, Param, Post, Body, UseGuards } from '@nestjs/common';
import { VenuesService } from './venues.service.js';
import { CreateVenueDto } from './dto/create-venue.dto.js';
import { JwtAuthGuard } from '../auth/auth.guard.js';
import { AdminGuard } from '../auth/admin.guard.js';


@Controller('venues')
export class VenuesController {
    constructor(
        private readonly venuesService: VenuesService
    ) { }

    @Get()
    findAll(@Query('city') cityId?: string, @Query('vibe') vibe?: string,) {
        return this.venuesService.findAll(cityId, vibe);
    }
    @Get(':id')
    findById(@Param('id') id: string) {
        return this.venuesService.findById(id);
    }
    @Post()
    @UseGuards(JwtAuthGuard, AdminGuard)
    create(@Body() createVenueDto: CreateVenueDto) {
        return this.venuesService.create(createVenueDto);
    }

}
