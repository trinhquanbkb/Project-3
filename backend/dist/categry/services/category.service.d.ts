import { FilterQuery } from 'mongoose';
import { CreatecategoryDto } from '../dto/create-category.dto';
import { UpdatecategoryDto } from '../dto/update-category.dto';
import { CategoryRepository } from '../repository/category.repository';
export declare class CategoryService {
    private readonly categoryRepository;
    constructor(categoryRepository: CategoryRepository);
    create(createcategoryDto: CreatecategoryDto): Promise<import("../schema/category.schema").categoryDocument>;
    findAll(): Promise<import("../schema/category.schema").categoryDocument[]>;
    findOne(filter: FilterQuery<any>): Promise<import("../schema/category.schema").categoryDocument>;
    update(id: string, updatecategoryDto: UpdatecategoryDto): Promise<import("../schema/category.schema").categoryDocument>;
    remove(id: number): string;
}
