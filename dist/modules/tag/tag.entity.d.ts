import { Article } from '../article/article.entity';
export declare class Tag {
    id: string;
    label: string;
    value: string;
    articles: Array<Article>;
    createAt: Date;
    updateAt: Date;
}
