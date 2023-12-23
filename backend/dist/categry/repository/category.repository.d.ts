import { FilterQuery, Model } from 'mongoose';
import { CreatecategoryDto } from '../dto/create-category.dto';
import { UpdatecategoryDto } from '../dto/update-category.dto';
import { categoryDocument } from '../schema/category.schema';
export declare class CategoryRepository {
    private CategoryModel;
    constructor(CategoryModel: Model<categoryDocument>);
    findOne(filter: FilterQuery<any>): Promise<categoryDocument | null>;
    create(createDto: CreatecategoryDto): Promise<categoryDocument>;
    update(id: string, updateDto: Partial<UpdatecategoryDto>): Promise<categoryDocument>;
    findAll(filter?: FilterQuery<any>): Promise<categoryDocument[]>;
    delete(_id: string): Promise<categoryDocument | null>;
}
