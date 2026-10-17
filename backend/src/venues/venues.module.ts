import { Module } from '@nestjs/common';
import { VenuesController } from './venues.controller.js';
import { VenuesService } from './venues.service.js';
import { MongooseModule } from '@nestjs/mongoose';
import { VenueSchema } from './venue.model.js';
import { AuthModule } from '../auth/auth.module.js';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: 'Venue',
        schema: VenueSchema,
      },

    ]),
    AuthModule,
  ],
  controllers: [VenuesController],
  providers: [VenuesService]
})
export class VenuesModule { }
