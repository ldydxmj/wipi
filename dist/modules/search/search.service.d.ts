import { Repository } from 'typeorm';
import { ArticleService } from '../article/article.service';
import { Search } from './search.entity';
export declare class SearchService {
    private readonly searchRepository;
    private readonly articleService;
    constructor(searchRepository: Repository<Search>, articleService: ArticleService);
    searchArticle(type: any, keyword: any): Promise<import("../article/article.entity").Article[]>;
    addRecord(type: any, keyword: any): Promise<Search>;
    findAll(queryParams?: any): Promise<[Search[], number]>;
    deleteById(id: any): Promise<Search>;
}
