import { Article } from '../article/article.entity';
export declare class Category {
    id: string;
    label: string;
    value: string;
    articles: Array<Article>;
    createAt: Date;
    updateAt: Date;
}
