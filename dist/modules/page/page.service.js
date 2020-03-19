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
const page_entity_1 = require("./page.entity");
const markdown_util_1 = require("../article/markdown.util");
let PageService = class PageService {
    constructor(pageRepository) {
        this.pageRepository = pageRepository;
    }
    async create(page) {
        const { name, path } = page;
        const exist = await this.pageRepository.findOne({ where: { path } });
        if (exist) {
            throw new common_1.HttpException('页面已存在', common_1.HttpStatus.BAD_REQUEST);
        }
        let { content } = page;
        const { html, toc } = content ? markdown_util_1.marked(content) : { html: null, toc: null };
        const newPage = await this.pageRepository.create(Object.assign(Object.assign({}, page), { html, toc: JSON.stringify(toc) }));
        await this.pageRepository.save(newPage);
        return newPage;
    }
    async findAll(queryParams = {}) {
        const query = this.pageRepository
            .createQueryBuilder('page')
            .orderBy('publishAt', 'DESC');
        const { page = 1, pageSize = 12, status } = queryParams, otherParams = __rest(queryParams, ["page", "pageSize", "status"]);
        query.skip((+page - 1) * +pageSize);
        query.take(+pageSize);
        if (status) {
            query.andWhere('page.status=:status').setParameter('status', status);
        }
        if (otherParams) {
            Object.keys(otherParams).forEach(key => {
                query
                    .andWhere(`page.${key} LIKE :${key}`)
                    .setParameter(`${key}`, `%${otherParams[key]}%`);
            });
        }
        return query.getManyAndCount();
    }
    async findById(id) {
        const query = this.pageRepository
            .createQueryBuilder('page')
            .where('page.id=:id')
            .orWhere('page.path=:path')
            .setParameter('id', id)
            .setParameter('path', id);
        return query.getOne();
    }
    async updateViewsById(id) {
        const old = await this.pageRepository.findOne(id);
        const newData = await this.pageRepository.merge(old, {
            views: old.views + 1,
        });
        return this.pageRepository.save(newData);
    }
    async updateById(id, page) {
        const old = await this.pageRepository.findOne(id);
        let { content, status } = page;
        const { html, toc } = content ? markdown_util_1.marked(content) : old;
        const newPage = Object.assign(Object.assign({}, page), { html, toc: JSON.stringify(toc), publishAt: status === 'publish' ? new Date() : old.publishAt });
        const updatedPage = await this.pageRepository.merge(old, newPage);
        return this.pageRepository.save(updatedPage);
    }
    async deleteById(id) {
        const page = await this.pageRepository.findOne(id);
        return this.pageRepository.remove(page);
    }
};
PageService = __decorate([
    common_1.Injectable(),
    __param(0, typeorm_1.InjectRepository(page_entity_1.Page)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], PageService);
exports.PageService = PageService;
//# sourceMappingURL=page.service.js.map