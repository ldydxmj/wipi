import { Repository } from 'typeorm';
import { Page } from './page.entity';
export declare class PageService {
    private readonly pageRepository;
    constructor(pageRepository: Repository<Page>);
    create(page: Partial<Page>): Promise<Page>;
    findAll(queryParams?: any): Promise<[Page[], number]>;
    findById(id: any): Promise<Page>;
    updateViewsById(id: any): Promise<Page>;
    updateById(id: any, page: Partial<Page>): Promise<Page>;
    deleteById(id: any): Promise<Page>;
}
