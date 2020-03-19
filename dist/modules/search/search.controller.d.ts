import { SearchService } from './search.service';
export declare class SearchController {
    private readonly searchService;
    constructor(searchService: SearchService);
    searchArticle(keyword: any): Promise<import("../article/article.entity").Article[]>;
    findAll(queryParam: any): Promise<[import("./search.entity").Search[], number]>;
    deleteById(id: any): Promise<import("./search.entity").Search>;
}
