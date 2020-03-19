import { Repository } from 'typeorm';
import { Tag } from './tag.entity';
export declare class TagService {
    private readonly tagRepository;
    constructor(tagRepository: Repository<Tag>);
    create(tag: Partial<Tag>): Promise<Tag>;
    findAll(): Promise<Tag[]>;
    findById(id: any): Promise<Tag>;
    getArticleById(id: any, status?: any): Promise<Tag>;
    findByIds(ids: any): Promise<Array<Tag>>;
    updateById(id: any, tag: Partial<Tag>): Promise<Tag>;
    deleteById(id: any): Promise<Tag>;
}
