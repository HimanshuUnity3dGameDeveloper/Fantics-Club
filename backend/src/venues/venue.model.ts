import * as mongoose from 'mongoose';

export const VenueSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            trim: true,
        },

        cityId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'City',
            required: true,
        },

        vibeCategory: {
            type: String,
            required: true,
            enum: ['clubbing', 'lounge', 'rooftop', 'fine_dining'],
        },

        address: {
            type: String,
            required: true,
            trim: true,
        },

        mapUrl: {
            type: String,
            default: '',
        },

        coordinates: {
            latitude: Number,
            longitude: Number,
        },

        coverCharge: {
            type: Number,
            default: 0,
            min: 0,
        },

        minTableSpend: {
            type: Number,
            default: 0,
            min: 0,
        },

        heroImage: {
            type: String,
            default: '',
        },

        gallery: {
            type: [String],
            default: [],
        },

        rating: {
            type: Number,
            default: 0,
            min: 0,
            max: 5,
        },

        reviewCount: {
            type: Number,
            default: 0,
            min: 0,
        },

        operatingHours: {
            type: String,
            default: '',
        },

        dressCode: {
            type: String,
            default: '',
        },

        featured: {
            type: Boolean,
            default: false,
        },

        active: {
            type: Boolean,
            default: true,
        },
    },
    {
        timestamps: true,
    },
);

export interface VenueModel extends mongoose.Document {
    name: string;
    cityId: mongoose.Types.ObjectId;
    vibeCategory: 'clubbing' | 'lounge' | 'rooftop' | 'fine_dining';
    address: string;
    mapUrl?: string;
    coordinates?: {
        latitude?: number;
        longitude?: number;
    };
    coverCharge: number;
    minTableSpend: number;
    heroImage?: string;
    gallery: string[];
    rating: number;
    reviewCount: number;
    operatingHours?: string;
    dressCode?: string;
    featured: boolean;
    active: boolean;
    createdAt: Date;
    updatedAt: Date;
}