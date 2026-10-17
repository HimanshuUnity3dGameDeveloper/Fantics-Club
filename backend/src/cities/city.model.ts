
import * as mongoose from 'mongoose';

export const CitySchema = new mongoose.Schema(
    {
        name: { type: String, required: true, trim: true, },
        slug: { type: String, required: true, unique: true, lowercase: true, trim: true, },
        description: { type: String, default: '', },
        coordinates: {
            latitude: { type: Number, min: -90, max: 90, },
            longitude: { type: Number, min: -180, max: 180, },
        },
        coverImage: { type: String, default: '', },
        venueCount: { type: Number, default: 0, min: 0, },
        bookedPercentage: { type: Number, default: 0, min: 0, max: 100, },
        minCoverCharge: { type: Number, default: 0, min: 0, },
        hotspots: { type: [String], default: [], },
        active: { type: Boolean, required: true, default: true, },
    },
    {
        timestamps: true,
    },
);

export interface CityModel extends mongoose.Document {
    name: string;
    slug: string;
    description?: string;
    coordinates?: {
        latitude?: number;
        longitude?: number;
    };
    coverImage?: string;
    venueCount: number;
    bookedPercentage: number;
    minCoverCharge: number;
    hotspots: string[];
    active: boolean;
    createdAt: Date;
    updatedAt: Date;
}
