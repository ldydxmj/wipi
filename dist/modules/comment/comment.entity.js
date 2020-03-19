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
let Comment = class Comment {
};
__decorate([
    typeorm_1.PrimaryGeneratedColumn('uuid'),
    __metadata("design:type", String)
], Comment.prototype, "id", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", String)
], Comment.prototype, "name", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", String)
], Comment.prototype, "email", void 0);
__decorate([
    typeorm_1.Column({ type: 'mediumtext', default: null, charset: 'utf8mb4' }),
    __metadata("design:type", String)
], Comment.prototype, "content", void 0);
__decorate([
    typeorm_1.Column({ type: 'mediumtext', default: null, charset: 'utf8mb4' }),
    __metadata("design:type", String)
], Comment.prototype, "html", void 0);
__decorate([
    typeorm_1.Column({ type: 'boolean', default: false }),
    __metadata("design:type", Boolean)
], Comment.prototype, "pass", void 0);
__decorate([
    typeorm_1.Column({ type: 'mediumtext', default: null, charset: 'utf8mb4' }),
    __metadata("design:type", String)
], Comment.prototype, "userAgent", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", String)
], Comment.prototype, "hostId", void 0);
__decorate([
    typeorm_1.Column({ type: 'boolean', default: false }),
    __metadata("design:type", Boolean)
], Comment.prototype, "isHostInPage", void 0);
__decorate([
    typeorm_1.Column({ default: null }),
    __metadata("design:type", String)
], Comment.prototype, "parentCommentId", void 0);
__decorate([
    typeorm_1.Column({ default: null }),
    __metadata("design:type", String)
], Comment.prototype, "replyUserName", void 0);
__decorate([
    typeorm_1.Column({ default: null }),
    __metadata("design:type", String)
], Comment.prototype, "replyUserEmail", void 0);
__decorate([
    typeorm_1.CreateDateColumn({
        type: 'datetime',
        comment: '创建时间',
        name: 'create_at',
    }),
    __metadata("design:type", Date)
], Comment.prototype, "createAt", void 0);
__decorate([
    typeorm_1.UpdateDateColumn({
        type: 'datetime',
        comment: '更新时间',
        name: 'update_at',
    }),
    __metadata("design:type", Date)
], Comment.prototype, "updateAt", void 0);
Comment = __decorate([
    typeorm_1.Entity()
], Comment);
exports.Comment = Comment;
//# sourceMappingURL=comment.entity.js.map