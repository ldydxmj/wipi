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
const article_service_1 = require("../article/article.service");
const search_entity_1 = require("./search.entity");
let SearchService = class SearchService {
    constructor(searchRepository, articleService) {
        this.searchRepository = searchRepository;
        this.articleService = articleService;
    }
    async searchArticle(type, keyword) {
        const articles = await this.articleService.search(keyword);
        await this.addRecord(type, keyword);
        return articles;
    }
    async addRecord(type, keyword) {
        const exist = await this.searchRepository.findOne({
            where: { type, keyword },
        });
        if (exist) {
            const count = exist.count;
            const newData = await this.searchRepository.merge(exist, {
                count: count + 1,
            });
            await this.searchRepository.save(newData);
            return newData;
        }
        const newData = await this.searchRepository.create({ type, keyword });
        await this.searchRepository.save(newData);
    }
    async findAll(queryParams = {}) {
        const query = this.searchRepository
            .createQueryBuilder('search')
            .orderBy('search.updateAt', 'DESC');
        const { page = 1, pageSize = 12, pass } = queryParams, otherParams = __rest(queryParams, ["page", "pageSize", "pass"]);
        query.skip((+page - 1) * +pageSize);
        query.take(+pageSize);
        if (otherParams) {
            Object.keys(otherParams).forEach(key => {
                query
                    .andWhere(`search.${key} LIKE :${key}`)
                    .setParameter(`${key}`, `%${otherParams[key]}%`);
            });
        }
        return query.getManyAndCount();
    }
    async deleteById(id) {
        const data = await this.searchRepository.findOne(id);
        return this.searchRepository.remove(data);
    }
};
SearchService = __decorate([
    common_1.Injectable(),
    __param(0, typeorm_1.InjectRepository(search_entity_1.Search)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        article_service_1.ArticleService])
], SearchService);
exports.SearchService = SearchService;
//# sourceMappingURL=search.service.js.map