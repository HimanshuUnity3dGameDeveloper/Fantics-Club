import { IsString, IsMongoId, IsIn, IsOptional, IsNumber, IsArray, Min, Max, } from 'class-validator';

export class CreateVenueDto {
    @IsString()
    name!: string;

    @IsMongoId()
    cityId!: string;

    @IsIn(['clubbing', 'lounge', 'rooftop', 'fine_dining'])
    vibeCategory!: string;

    @IsString()
    address!: string;

    @IsOptional()
    @IsString()
    mapUrl?: string;

    @IsOptional()
    @IsNumber()
    @Min(0)
    coverCharge?: number;

    @IsOptional()
    @IsNumber()
    @Min(0)
    minTableSpend?: number;

    @IsOptional()
    @IsString()
    heroImage?: string;

    @IsOptional()
    @IsArray()
    @IsString({ each: true })
    gallery?: string[];

    @IsOptional()
    @IsNumber()
    @Min(0)
    @Max(5)
    rating?: number;

    @IsOptional()
    @IsNumber()
    @Min(0)
    reviewCount?: number;

    @IsOptional()
    @IsString()
    operatingHours?: string;

    @IsOptional()
    @IsString()
    dressCode?: string;
}