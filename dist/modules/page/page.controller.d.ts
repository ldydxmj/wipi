import { PageService } from './page.service';
export declare class PageController {
    private readonly pageService;
    constructor(pageService: PageService);
    create(page: any): Promise<import("./page.entity").Page>;
    findAll(queryParams: any): Promise<[import("./page.entity").Page[], number]>;
    findById(id: any): Promise<import("./page.entity").Page>;
    updateById(id: any, page: any): Promise<import("./page.entity").Page>;
    updateViewsById(id: any): Promise<import("./page.entity").Page>;
    deleteById(id: any): Promise<import("./page.entity").Page>;
}
