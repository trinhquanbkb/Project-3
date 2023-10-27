import { ApiProperty } from '@nestjs/swagger';
import { ObjectID } from 'mongodb';

type typeName = {
    name: string;
    language: string;
}

type typeDes = {
    des: string;
    language: string;
}

export type typeImage = {
    name: typeName[]
    url: string;
    description: typeDes[]
}

export class CreateProductDto {
    @ApiProperty({ type: [Object], required: true })
    name: typeName[];
    @ApiProperty({ type: [Object]})
    description?: typeDes[];

    @ApiProperty({
        required: true,
        type: String,
    })
    condition: string;

    @ApiProperty({
        required: true,
        type: String,
    })
    size: string;

    @ApiProperty({
        required: true,
        type: String,
    })
    weight: string;

    @ApiProperty({
        required: true,
        type: String,
    })
    url: string;

    @ApiProperty({ required: true })
    price: number;

    @ApiProperty({ required: true })
    images: typeImage[];

    @ApiProperty({ type: String, required: true })
    category_id: string;

    @ApiProperty()
    discounts?: number;

}
