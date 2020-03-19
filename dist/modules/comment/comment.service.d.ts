import { Repository } from 'typeorm';
import { SMTPService } from '../smtp/smtp.service';
import { ArticleService } from '../article/article.service';
import { SettingService } from '../setting/setting.service';
import { UserService } from '../user/user.service';
import { Comment } from './comment.entity';
export declare class CommentService {
    private readonly commentRepository;
    private readonly articleService;
    private readonly smtpService;
    private readonly settingService;
    private readonly userService;
    constructor(commentRepository: Repository<Comment>, articleService: ArticleService, smtpService: SMTPService, settingService: SettingService, userService: UserService);
    create(userAgent: any, comment: Partial<Comment> & {
        reply?: string;
        createByAdmin?: boolean;
    }): Promise<Comment>;
    findAll(queryParams?: any): Promise<[Comment[], number]>;
    findById(id: any): Promise<Comment>;
    getArticleComments(hostId: any, queryParams: any): Promise<(number | Comment[])[]>;
    findByIds(ids: any): Promise<Array<Comment>>;
    updateById(id: any, data: Partial<Comment>): Promise<Comment>;
    deleteById(id: any): Promise<Comment>;
}
