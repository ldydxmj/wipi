import { CategoryService } from './category.service';
import { Category } from './category.entity';
export declare class CategoryController {
    private readonly categoryService;
    constructor(categoryService: CategoryService);
    create(category: any): Promise<Category>;
    findAll(): Promise<Category[]>;
    findById(id: any): Promise<Category>;
    updateById(id: any, category: any): Promise<Category>;
    deleteById(id: any): Promise<Category>;
}
