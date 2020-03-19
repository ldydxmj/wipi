import { TagService } from './tag.service';
import { Tag } from './tag.entity';
export declare class TagController {
    private readonly tagService;
    constructor(tagService: TagService);
    create(tag: any): Promise<Tag>;
    findAll(): Promise<Tag[]>;
    findById(id: any): Promise<Tag>;
    getArticleById(id: any, status: any): Promise<Tag>;
    updateById(id: any, tag: any): Promise<Tag>;
    deleteById(id: any): Promise<Tag>;
}
