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
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("@nestjs/common");
const jwt_auth_guard_1 = require("../auth/jwt-auth.guard");
const roles_guard_1 = require("../auth/roles.guard");
const article_service_1 = require("./article.service");
let ArticleController = class ArticleController {
    constructor(articleService) {
        this.articleService = articleService;
    }
    create(article) {
        console.log("ArticleController -> create -> article", article);
        return this.articleService.create(article);
    }
    findAll(queryParams) {
        return this.articleService.findAll(queryParams);
    }
    findArticlesByCategory(category, queryParams) {
        return this.articleService.findArticlesByCategory(category, queryParams);
    }
    findArticlesByTag(tag, queryParams) {
        return this.articleService.findArticlesByTag(tag, queryParams);
    }
    getArchives() {
        return this.articleService.getArchives();
    }
    recommend(articleId) {
        return this.articleService.recommend(articleId);
    }
    findById(id, status) {
        return this.articleService.findById(id, status);
    }
    checkPassword(id, article) {
        return this.articleService.checkPassword(id, article);
    }
    updateViewsById(id) {
        return this.articleService.updateViewsById(id);
    }
    updateById(id, article) {
        console.log(id, 'id');
        return this.articleService.updateById(id, article);
    }
    deleteById(id) {
        return this.articleService.deleteById(id);
    }
};
__decorate([
    common_1.Post(),
    common_1.UseGuards(jwt_auth_guard_1.JwtAuthGuard),
    __param(0, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], ArticleController.prototype, "create", null);
__decorate([
    common_1.Get(),
    common_1.HttpCode(common_1.HttpStatus.OK),
    __param(0, common_1.Query()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], ArticleController.prototype, "findAll", null);
__decorate([
    common_1.Get('/category/:id'),
    common_1.HttpCode(common_1.HttpStatus.OK),
    __param(0, common_1.Param('id')), __param(1, common_1.Query()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", void 0)
], ArticleController.prototype, "findArticlesByCategory", null);
__decorate([
    common_1.Get('/tag/:id'),
    common_1.HttpCode(common_1.HttpStatus.OK),
    __param(0, common_1.Param('id')), __param(1, common_1.Query()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", void 0)
], ArticleController.prototype, "findArticlesByTag", null);
__decorate([
    common_1.Get('/archives'),
    common_1.HttpCode(common_1.HttpStatus.OK),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], ArticleController.prototype, "getArchives", null);
__decorate([
    common_1.Get('/recommend'),
    common_1.HttpCode(common_1.HttpStatus.OK),
    __param(0, common_1.Query('articleId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], ArticleController.prototype, "recommend", null);
__decorate([
    common_1.Get(':id'),
    __param(0, common_1.Param('id')), __param(1, common_1.Query('status')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", void 0)
], ArticleController.prototype, "findById", null);
__decorate([
    common_1.Post(':id/checkPassword'),
    common_1.HttpCode(common_1.HttpStatus.OK),
    __param(0, common_1.Param('id')), __param(1, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", void 0)
], ArticleController.prototype, "checkPassword", null);
__decorate([
    common_1.Post(':id/views'),
    common_1.HttpCode(common_1.HttpStatus.OK),
    __param(0, common_1.Param('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], ArticleController.prototype, "updateViewsById", null);
__decorate([
    common_1.Patch(':id'),
    roles_guard_1.Roles('admin'),
    common_1.UseGuards(jwt_auth_guard_1.JwtAuthGuard),
    common_1.HttpCode(common_1.HttpStatus.OK),
    __param(0, common_1.Param('id')), __param(1, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", void 0)
], ArticleController.prototype, "updateById", null);
__decorate([
    common_1.Delete(':id'),
    roles_guard_1.Roles('admin'),
    common_1.UseGuards(jwt_auth_guard_1.JwtAuthGuard),
    __param(0, common_1.Param('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], ArticleController.prototype, "deleteById", null);
ArticleController = __decorate([
    common_1.Controller('article'),
    common_1.UseGuards(roles_guard_1.RolesGuard),
    __metadata("design:paramtypes", [article_service_1.ArticleService])
], ArticleController);
exports.ArticleController = ArticleController;
//# sourceMappingURL=article.controller.js.map