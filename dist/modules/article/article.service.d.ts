import { Repository } from 'typeorm';
import { TagService } from '../tag/tag.service';
import { CategoryService } from '../category/category.service';
import { Article } from './article.entity';
export declare class ArticleService {
    private readonly articleRepository;
    private readonly tagService;
    private readonly categoryService;
    constructor(articleRepository: Repository<Article>, tagService: TagService, categoryService: CategoryService);
    create(article: Partial<Article>): Promise<Article>;
    findAll(queryParams?: any): Promise<[Article[], number]>;
    findArticlesByCategory(category: any, queryParams: any): Promise<(number | Article[])[]>;
    findArticlesByTag(tag: any, queryParams: any): Promise<(number | Article[])[]>;
    getArchives(): Promise<{
        [key: string]: Article[];
    }>;
    checkPassword(id: any, { password }: {
        password: any;
    }): Promise<{
        pass: boolean;
    }>;
    findById(id: any, status?: any): Promise<Article>;
    updateById(id: any, article: Partial<Article>): Promise<Article>;
    updateViewsById(id: any): Promise<Article>;
    deleteById(id: any): Promise<Article>;
    search(keyword: any): Promise<Article[]>;
    recommend(articleId?: any): Promise<Article[]>;
}
