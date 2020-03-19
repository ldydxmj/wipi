"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const smtp_service_1 = require("../smtp/smtp.service");
const article_service_1 = require("../article/article.service");
const setting_service_1 = require("../setting/setting.service");
const user_service_1 = require("../user/user.service");
const markdown_util_1 = require("../article/markdown.util");
const comment_entity_1 = require("./comment.entity");
const url = require('url');
const UAParser = require('ua-parser-js');
const dayjs = require('dayjs');
function buildTree(list) {
    let temp = {};
    let tree = [];
    for (let item of list) {
        temp[item.id] = item;
    }
    for (let i in temp) {
        if (temp[i].parentCommentId) {
            if (temp[temp[i].parentCommentId]) {
                if (!temp[temp[i].parentCommentId].children) {
                    temp[temp[i].parentCommentId].children = [];
                }
                temp[temp[i].parentCommentId].children.push(temp[i]);
            }
            else {
                tree.push(temp[i]);
            }
        }
        else {
            tree.push(temp[i]);
        }
    }
    return tree;
}
const parseUserAgent = userAgent => {
    const uaparser = new UAParser();
    uaparser.setUA(userAgent);
    const uaInfo = uaparser.getResult();
    return `${uaInfo.browser.name} ${uaInfo.os.name} ${uaInfo.device.vendor
        ? uaInfo.device.vendor +
            ' ' +
            uaInfo.device.model +
            ' ' +
            uaInfo.device.type
        : ''}
  `;
};
let CommentService = class CommentService {
    constructor(commentRepository, articleService, smtpService, settingService, userService) {
        this.commentRepository = commentRepository;
        this.articleService = articleService;
        this.smtpService = smtpService;
        this.settingService = settingService;
        this.userService = userService;
    }
    async create(userAgent, comment) {
        const { hostId, name, email, content, createByAdmin = false } = comment;
        if (!hostId || !name || !email || !content) {
            throw new common_1.HttpException('缺失参数', common_1.HttpStatus.BAD_REQUEST);
        }
        const { html } = markdown_util_1.marked(content);
        comment.html = html;
        comment.pass = false;
        comment.userAgent = parseUserAgent(userAgent);
        const newComment = await this.commentRepository.create(comment);
        await this.commentRepository.save(comment);
        if (!createByAdmin) {
            const { smtpFromUser: from, systemUrl, systemTitle, } = await this.settingService.findAll(true);
            const sendEmail = (adminName, adminEmail) => {
                const emailMessage = {
                    from,
                    to: adminEmail,
                    subject: '新评论通知',
                    html: `
<div>
<table cellpadding="0" align="center" style="width: 600px; margin: 0px auto; text-align: left; position: relative; font-size: 14px; font-family:微软雅黑, 黑体; line-height: 1.5; box-shadow: rgb(153, 153, 153) 0px 0px 5px; border-collapse: collapse; background-position: initial initial; background-repeat: initial initial;background:#fff;">
    <tbody>
    <tr>
        <th valign="middle"
            style="height: 25px; line-height: 25px; padding: 15px 35px; background-color: #ff0064; border-top-left-radius: 5px; border-top-right-radius: 5px; border-bottom-right-radius: 0px; border-bottom-left-radius: 0px;">
            <font face="微软雅黑" size="5" style="color: rgb(255, 255, 255);">新评论通知</font>
        </th>
    </tr>
    <tr>
        <td>
            <div style="padding:25px 35px 40px; background-color:#fff;">
                <h2 style="margin: 5px 0px; ">
                  <font color="#333333" style="line-height: 20px; ">
                    <font style="line-height: 22px; " size="4">
                      亲爱的 ${adminName}
                    </font>
                  </font>
                </h2>
                <p>站点收到新评论：</p>
                <p>评论人：<b>${comment.name}</b></p>
                <p>评论内容：<b>${comment.content}</b></p>
                <p align="center">
                  <a href="${url.resolve(systemUrl, 'admin/comment')}" style="display: inline-block; margin: 16px auto; width: 160px; height: 32px; line-height: 32px; color: #ff0064; border: 1px solid #ff0064; background-color: #fff0f6; border-radius: 4px; text-decoration: none;">
                  前往审核
                  </a>
                </p>
                <p align="right">${systemTitle}</p>
                <p align="right">${dayjs(new Date()).format('YYYY-MM-DD HH:mm:ss')}</p>
                <div style="width:700px;margin:0 auto;">
                    <div style="padding:10px 10px 0;border-top:1px solid #ccc;color:#747474;margin-bottom:20px;line-height:1.3em;font-size:12px;">
                        <p>此为系统邮件，请勿回复<br>
                            请保管好您的邮箱，避免账号被他人盗用
                        </p>
                    </div>
                </div>
            </div>
        </td>
    </tr>
    </tbody>
</table>
</div>
        `,
                };
                this.smtpService.create(emailMessage).catch(() => {
                    console.log('收到新评论，但发送邮件通知失败');
                });
            };
            try {
                const [users] = await this.userService.findAll({ role: 'admin' });
                users.forEach(user => {
                    if (user.email) {
                        sendEmail(user.name, user.email);
                    }
                });
            }
            catch (e) {
                console.log(e);
            }
        }
        return newComment;
    }
    async findAll(queryParams = {}) {
        const query = this.commentRepository
            .createQueryBuilder('comment')
            .orderBy('comment.createAt', 'DESC');
        const { page = 1, pageSize = 12, pass } = queryParams, otherParams = __rest(queryParams, ["page", "pageSize", "pass"]);
        query.skip((+page - 1) * +pageSize);
        query.take(+pageSize);
        if (pass) {
            query.andWhere('comment.pass=:pass').setParameter('pass', pass);
        }
        if (otherParams) {
            Object.keys(otherParams).forEach(key => {
                query
                    .andWhere(`comment.${key} LIKE :${key}`)
                    .setParameter(`${key}`, `%${otherParams[key]}%`);
            });
        }
        return query.getManyAndCount();
    }
    async findById(id) {
        return this.commentRepository.findOne(id);
    }
    async getArticleComments(hostId, queryParams) {
        const query = this.commentRepository
            .createQueryBuilder('comment')
            .where('comment.hostId=:hostId')
            .andWhere('comment.pass=:pass')
            .andWhere('comment.parentCommentId is NULL')
            .orderBy('comment.createAt', 'DESC')
            .setParameter('hostId', hostId)
            .setParameter('pass', true);
        const subQuery = this.commentRepository
            .createQueryBuilder('comment')
            .andWhere('comment.pass=:pass')
            .andWhere('comment.parentCommentId=:parentCommentId')
            .orderBy('comment.createAt', 'ASC')
            .setParameter('pass', true);
        const { page = 1, pageSize = 12 } = queryParams;
        query.skip((+page - 1) * +pageSize);
        query.take(+pageSize);
        const [data, count] = await query.getManyAndCount();
        for (let item of data) {
            const subComments = await subQuery
                .setParameter('parentCommentId', item.id)
                .getMany();
            Object.assign(item, { children: subComments });
        }
        return [data, count];
    }
    async findByIds(ids) {
        return this.commentRepository.findByIds(ids);
    }
    async updateById(id, data) {
        const old = await this.commentRepository.findOne(id);
        const newData = await this.commentRepository.merge(old, data);
        if (newData.pass) {
            const { replyUserName, replyUserEmail, hostId, isHostInPage } = newData;
            const isReply = replyUserName && replyUserEmail;
            if (isReply) {
                try {
                    const { smtpFromUser: from, systemUrl, systemTitle, } = await this.settingService.findAll(true);
                    const emailMessage = {
                        from,
                        to: replyUserEmail,
                        subject: '评论回复通知',
                        html: `
<div>
  <table cellpadding="0" align="center"
          style="width: 600px; margin: 0px auto; text-align: left; position: relative; border-top-left-radius: 5px; border-top-right-radius: 5px; border-bottom-right-radius: 5px; border-bottom-left-radius: 5px; font-size: 14px; font-family:微软雅黑, 黑体; line-height: 1.5; box-shadow: rgb(153, 153, 153) 0px 0px 5px; border-collapse: collapse; background-position: initial initial; background-repeat: initial initial;background:#fff;">
      <tbody>
      <tr>
          <th valign="middle"
              style="height: 25px; line-height: 25px; padding: 15px 35px; background-color: #ff0064; border-top-left-radius: 5px; border-top-right-radius: 5px; border-bottom-right-radius: 0px; border-bottom-left-radius: 0px;">
              <font face="微软雅黑" size="5" style="color: rgb(255, 255, 255); ">评论回复通知</font>
          </th>
      </tr>
      <tr>
          <td>
              <div style="padding:25px 35px 40px; background-color:#fff;">
                  <h2 style="margin: 5px 0px; ">
                    <font color="#333333" style="line-height: 20px; ">
                      <font style="line-height: 22px; " size="4">
                        亲爱的 ${replyUserName}
                      </font>
                    </font>
                  </h2>
                  <p>您的评论已经被他人回复。点击下方按钮前往查看。</p>
                  <p align="center">
                    <a href="${url.resolve(systemUrl, `/${isHostInPage ? 'page' : 'article'}/` + hostId)}" style="display: inline-block; margin: 16px auto; width: 160px; height: 32px; line-height: 32px; color: #ff0064; border: 1px solid #ff0064; background-color: #fff0f6; border-radius: 4px; text-decoration: none;">
                    前往查看
                    </a>
                  </p>
                  <p align="right">${systemTitle}</p>
                  <p align="right">${dayjs(new Date()).format('YYYY-MM-DD HH:mm:ss')}</p>
                  <div style="width:700px;margin:0 auto;">
                      <div style="padding:10px 10px 0;border-top:1px solid #ccc;color:#747474;margin-bottom:20px;line-height:1.3em;font-size:12px;">
                          <p>此为系统邮件，请勿回复<br>
                              请保管好您的邮箱，避免账号被他人盗用
                          </p>
                      </div>
                  </div>
              </div>
          </td>
      </tr>
      </tbody>
  </table>
</div>`,
                    };
                    this.smtpService.create(emailMessage).catch(() => {
                        console.log(`通知用户 ${replyUserName}（${replyUserEmail}），但发送邮件通知失败`);
                    });
                }
                catch (e) { }
            }
        }
        return this.commentRepository.save(newData);
    }
    async deleteById(id) {
        const data = await this.commentRepository.findOne(id);
        return this.commentRepository.remove(data);
    }
};
CommentService = __decorate([
    common_1.Injectable(),
    __param(0, typeorm_1.InjectRepository(comment_entity_1.Comment)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        article_service_1.ArticleService,
        smtp_service_1.SMTPService,
        setting_service_1.SettingService,
        user_service_1.UserService])
], CommentService);
exports.CommentService = CommentService;
//# sourceMappingURL=comment.service.js.map