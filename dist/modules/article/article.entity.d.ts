import { Tag } from '../tag/tag.entity';
import { Category } from '../category/category.entity';
export declare class Article {
    id: string;
    title: string;
    cover: string;
    summary: string;
    content: string;
    html: string;
    toc: string;
    category: Category;
    tags: Array<Tag>;
    status: string;
    views: number;
    password: string;
    needPassword: boolean;
    isCommentable: boolean;
    publishAt: Date;
    createAt: Date;
    updateAt: Date;
}
