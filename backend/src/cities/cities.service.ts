import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import { CityModel } from './city.model.js';

@Injectable()
export class CitiesService {
    constructor(
        @InjectModel('City')
        private readonly cityModel: mongoose.Model<CityModel>,
    ) { }
    // Get all active cities
    async findAll() {
        return this.cityModel
            .find({ active: true })
            .sort({ name: 1 })
            .exec();
    }
    // Get one city using its slug
    async findBySlug(slug: string) {
        const city = await this.cityModel
            .findOne({
                slug: slug.toLowerCase().trim(),
                active: true,
            })
            .exec();

        if (!city) {
            throw new NotFoundException('City not found');
        }

        return city;
    }


    // Find the closest city based on user's GPS coordinates
    async detectNearestCity(userLat: number, userLng: number) {
        // Validate latitude and longitude
        const isValidLat = Number.isFinite(userLat) && userLat >= -90 && userLat <= 90;
        const isValidLng = Number.isFinite(userLng) && userLng >= -180 && userLng <= 180;
        if (!isValidLat || !isValidLng) {
            throw new BadRequestException('Please provide valid GPS coordinates');
        }
        // Step 2: Get all active cities from MongoDB
        const cities = await this.findAll();
        let closestCity: CityModel | null = null;
        let shortestDistance = Infinity;

        for (const city of cities) {
            // Skip cities without coordinates
            const cityLat = city.coordinates?.latitude;
            const cityLng = city.coordinates?.longitude;

            if (cityLat == null || cityLng == null) continue;

            const distance = this.getDistanceInKm(userLat, userLng, cityLat, cityLng);

            if (distance < shortestDistance) {
                shortestDistance = distance;
                closestCity = city;
            }
        }

        if (!closestCity) {
            throw new NotFoundException('No nearby active city found');
        }
        // Step 5: Return the nearest city and its distance
        return {
            city: closestCity,
            distanceKm: Math.round(shortestDistance),
        };
    }

    // Calculate distance between user and city in kilometers (Haversine formula)
    private getDistanceInKm(
        userLat: number,
        userLng: number,
        cityLat: number,
        cityLng: number,
    ): number {
        const earthRadiusKm = 6371;
        const toRadians = (deg: number) => (deg * Math.PI) / 180;

        const diffLat = toRadians(cityLat - userLat);
        const diffLng = toRadians(cityLng - userLng);

        const arc =
            Math.sin(diffLat / 2) ** 2 +
            Math.cos(toRadians(userLat)) *
            Math.cos(toRadians(cityLat)) *
            Math.sin(diffLng / 2) ** 2;

        return earthRadiusKm * 2 * Math.atan2(Math.sqrt(arc), Math.sqrt(1 - arc));
    }


}
