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
const auth_module_1 = require("../auth/auth.module");
const article_service_1 = require("./article.service");
const tag_module_1 = require("../tag/tag.module");
const category_module_1 = require("../category/category.module");
const article_controller_1 = require("./article.controller");
const article_entity_1 = require("./article.entity");
let ArticleModule = class ArticleModule {
};
ArticleModule = __decorate([
    common_1.Module({
        imports: [
            typeorm_1.TypeOrmModule.forFeature([article_entity_1.Article]),
            category_module_1.CategoryModule,
            tag_module_1.TagModule,
            auth_module_1.AuthModule,
        ],
        exports: [article_service_1.ArticleService],
        providers: [article_service_1.ArticleService],
        controllers: [article_controller_1.ArticleController],
    })
], ArticleModule);
exports.ArticleModule = ArticleModule;
//# sourceMappingURL=article.module.js.map