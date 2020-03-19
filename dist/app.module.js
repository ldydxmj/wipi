"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const auth_module_1 = require("./modules/auth/auth.module");
const user_module_1 = require("./modules/user/user.module");
const user_entity_1 = require("./modules/user/user.entity");
const file_module_1 = require("./modules/file/file.module");
const file_entity_1 = require("./modules/file/file.entity");
const article_module_1 = require("./modules/article/article.module");
const article_entity_1 = require("./modules/article/article.entity");
const category_module_1 = require("./modules/category/category.module");
const category_entity_1 = require("./modules/category/category.entity");
const tag_module_1 = require("./modules/tag/tag.module");
const tag_entity_1 = require("./modules/tag/tag.entity");
const comment_module_1 = require("./modules/comment/comment.module");
const comment_entity_1 = require("./modules/comment/comment.entity");
const setting_module_1 = require("./modules/setting/setting.module");
const setting_entity_1 = require("./modules/setting/setting.entity");
const smtp_module_1 = require("./modules/smtp/smtp.module");
const smtp_entity_1 = require("./modules/smtp/smtp.entity");
const page_module_1 = require("./modules/page/page.module");
const page_entity_1 = require("./modules/page/page.entity");
const view_module_1 = require("./modules/view/view.module");
const view_entity_1 = require("./modules/view/view.entity");
const search_entity_1 = require("./modules/search/search.entity");
const search_module_1 = require("./modules/search/search.module");
const config_1 = require("./config");
let AppModule = class AppModule {
};
AppModule = __decorate([
    common_1.Module({
        imports: [
            typeorm_1.TypeOrmModule.forRoot(Object.assign(Object.assign({ type: 'mysql' }, config_1.config.mysql), { entities: [
                    user_entity_1.User,
                    file_entity_1.File,
                    tag_entity_1.Tag,
                    article_entity_1.Article,
                    category_entity_1.Category,
                    comment_entity_1.Comment,
                    setting_entity_1.Setting,
                    smtp_entity_1.SMTP,
                    page_entity_1.Page,
                    view_entity_1.View,
                    search_entity_1.Search,
                ], synchronize: true })),
            user_module_1.UserModule,
            file_module_1.FileModule,
            tag_module_1.TagModule,
            article_module_1.ArticleModule,
            category_module_1.CategoryModule,
            comment_module_1.CommentModule,
            setting_module_1.SettingModule,
            smtp_module_1.SMTPModule,
            auth_module_1.AuthModule,
            page_module_1.PageModule,
            view_module_1.ViewModule,
            search_module_1.SearchModule,
        ],
        controllers: [],
        providers: [],
    })
], AppModule);
exports.AppModule = AppModule;
//# sourceMappingURL=app.module.js.map