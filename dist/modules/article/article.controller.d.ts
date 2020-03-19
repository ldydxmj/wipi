import { ArticleService } from './article.service';
import { Article } from './article.entity';
export declare class ArticleController {
    private readonly articleService;
    constructor(articleService: ArticleService);
    create(article: any): Promise<Article>;
    findAll(queryParams: any): Promise<[Article[], number]>;
    findArticlesByCategory(category: any, queryParams: any): Promise<(number | Article[])[]>;
    findArticlesByTag(tag: any, queryParams: any): Promise<(number | Article[])[]>;
    getArchives(): Promise<{
        [key: string]: Article[];
    }>;
    recommend(articleId: any): Promise<Article[]>;
    findById(id: any, status: any): Promise<Article>;
    checkPassword(id: any, article: any): Promise<{
        pass: boolean;
    }>;
    updateViewsById(id: any): Promise<Article>;
    updateById(id: any, article: any): Promise<Article>;
    deleteById(id: any): Promise<Article>;
}
