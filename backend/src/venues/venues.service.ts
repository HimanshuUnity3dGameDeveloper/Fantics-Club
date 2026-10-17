import { Injectable, BadRequestException, NotFoundException, } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { VenueModel } from './venue.model.js';
import { CreateVenueDto } from './dto/create-venue.dto.js';

@Injectable()
export class VenuesService {
    constructor(
        @InjectModel('Venue')
        private readonly venueModel: Model<VenueModel>,
    ) { }
    findAll(cityId?: string, vibe?: string,): Promise<VenueModel[]> {
        const filter: any = {
            active: true,
        };

        if (cityId) {
            filter.cityId = cityId;
        }

        if (vibe) {
            filter.vibeCategory = vibe;
        }

        return this.venueModel
            .find(filter)
            .sort({ featured: -1, name: 1 })
            .exec();
    }

    async findById(id: string): Promise<VenueModel> {
        if (!Types.ObjectId.isValid(id)) {
            throw new BadRequestException('Invalid venue ID');
        }

        const venue = await this.venueModel
            .findOne({ _id: id, active: true })
            .exec();

        if (!venue) {
            throw new NotFoundException('Venue not found');
        }

        return venue;
    }
    async create(dto: CreateVenueDto): Promise<VenueModel> {
        const venue = new this.venueModel(dto);
        return venue.save();
    }
}