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
Object.defineProperty(exports, "__esModule", { value: true });
const typeorm_1 = require("typeorm");
const tag_entity_1 = require("../tag/tag.entity");
const category_entity_1 = require("../category/category.entity");
let Article = class Article {
};
__decorate([
    typeorm_1.PrimaryGeneratedColumn('uuid'),
    __metadata("design:type", String)
], Article.prototype, "id", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", String)
], Article.prototype, "title", void 0);
__decorate([
    typeorm_1.Column({ default: null }),
    __metadata("design:type", String)
], Article.prototype, "cover", void 0);
__decorate([
    typeorm_1.Column({ type: 'text', default: null }),
    __metadata("design:type", String)
], Article.prototype, "summary", void 0);
__decorate([
    typeorm_1.Column({ type: 'mediumtext', default: null, charset: 'utf8mb4' }),
    __metadata("design:type", String)
], Article.prototype, "content", void 0);
__decorate([
    typeorm_1.Column({ type: 'mediumtext', default: null, charset: 'utf8mb4' }),
    __metadata("design:type", String)
], Article.prototype, "html", void 0);
__decorate([
    typeorm_1.Column({ type: 'text', default: null }),
    __metadata("design:type", String)
], Article.prototype, "toc", void 0);
__decorate([
    typeorm_1.ManyToOne(() => category_entity_1.Category, category => category.articles, { cascade: true }),
    typeorm_1.JoinTable(),
    __metadata("design:type", category_entity_1.Category)
], Article.prototype, "category", void 0);
__decorate([
    typeorm_1.ManyToMany(() => tag_entity_1.Tag, tag => tag.articles, { cascade: true }),
    typeorm_1.JoinTable(),
    __metadata("design:type", Array)
], Article.prototype, "tags", void 0);
__decorate([
    typeorm_1.Column('simple-enum', { enum: ['draft', 'publish'] }),
    __metadata("design:type", String)
], Article.prototype, "status", void 0);
__decorate([
    typeorm_1.Column({ type: 'int', default: 0 }),
    __metadata("design:type", Number)
], Article.prototype, "views", void 0);
__decorate([
    typeorm_1.Column({ type: 'text', default: null, select: false }),
    __metadata("design:type", String)
], Article.prototype, "password", void 0);
__decorate([
    typeorm_1.Column({ type: 'boolean', default: false }),
    __metadata("design:type", Boolean)
], Article.prototype, "needPassword", void 0);
__decorate([
    typeorm_1.Column({ type: 'boolean', default: true }),
    __metadata("design:type", Boolean)
], Article.prototype, "isCommentable", void 0);
__decorate([
    typeorm_1.Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' }),
    __metadata("design:type", Date)
], Article.prototype, "publishAt", void 0);
__decorate([
    typeorm_1.CreateDateColumn({
        type: 'datetime',
        comment: '创建时间',
        name: 'create_at',
    }),
    __metadata("design:type", Date)
], Article.prototype, "createAt", void 0);
__decorate([
    typeorm_1.UpdateDateColumn({
        type: 'datetime',
        comment: '更新时间',
        name: 'update_at',
    }),
    __metadata("design:type", Date)
], Article.prototype, "updateAt", void 0);
Article = __decorate([
    typeorm_1.Entity()
], Article);
exports.Article = Article;
//# sourceMappingURL=article.entity.js.map