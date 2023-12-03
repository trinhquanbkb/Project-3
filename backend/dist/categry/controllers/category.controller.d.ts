import { CategoryService } from '../services/category.service';
import { CreatecategoryDto } from '../dto/create-category.dto';
import { UpdatecategoryDto } from '../dto/update-category.dto';
export declare class CategoryController {
    private readonly categoryService;
    constructor(categoryService: CategoryService);
    create(createCategoryDto: CreatecategoryDto): Promise<import("../schema/category.schema").categoryDocument>;
    findAll(): Promise<import("../schema/category.schema").categoryDocument[]>;
    findOne(id: string): Promise<import("../schema/category.schema").categoryDocument>;
    update(id: string, updatecategoryDto: UpdatecategoryDto): Promise<import("../schema/category.schema").categoryDocument>;
    remove(id: string): string;
}
