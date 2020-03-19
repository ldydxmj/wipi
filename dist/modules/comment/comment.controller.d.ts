import { CommentService } from './comment.service';
import { Comment } from './comment.entity';
export declare class CommentController {
    private readonly commentService;
    constructor(commentService: CommentService);
    create(req: any, comment: any): Promise<Comment>;
    findAll(queryParams: any): Promise<[Comment[], number]>;
    findById(id: any): Promise<Comment>;
    getArticleComments(hostId: any, qurey: any): Promise<(number | Comment[])[]>;
    updateById(id: any, data: any): Promise<Comment>;
    deleteById(id: any): Promise<Comment>;
}
