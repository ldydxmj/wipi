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
const tag_service_1 = require("../tag/tag.service");
const category_service_1 = require("../category/category.service");
const article_entity_1 = require("./article.entity");
const markdown_util_1 = require("./markdown.util");
const nodejieba = require('nodejieba');
const topN = 4;
let ArticleService = class ArticleService {
    constructor(articleRepository, tagService, categoryService) {
        this.articleRepository = articleRepository;
        this.tagService = tagService;
        this.categoryService = categoryService;
    }
    async create(article) {
        const { title } = article;
        const exist = await this.articleRepository.findOne({ where: { title } });
        if (exist) {
            throw new common_1.HttpException('文章标题已存在', common_1.HttpStatus.BAD_REQUEST);
        }
        let { content, tags, category } = article;
        const { html, toc } = content ? markdown_util_1.marked(content) : { html: null, toc: null };
        tags = await this.tagService.findByIds(('' + tags).split(','));
        let existCategory = await this.categoryService.findById(category);
        const newArticle = await this.articleRepository.create(Object.assign(Object.assign({}, article), { html, toc: JSON.stringify(toc), category: existCategory, tags, needPassword: !!article.password }));
        await this.articleRepository.save(newArticle);
        return newArticle;
    }
    async findAll(queryParams = {}) {
        const query = this.articleRepository
            .createQueryBuilder('article')
            .leftJoinAndSelect('article.tags', 'tag')
            .leftJoinAndSelect('article.category', 'category')
            .orderBy('article.publishAt', 'DESC');
        const { page = 1, pageSize = 12, status } = queryParams, otherParams = __rest(queryParams, ["page", "pageSize", "status"]);
        query.skip((+page - 1) * +pageSize);
        query.take(+pageSize);
        if (status) {
            query.andWhere('article.status=:status').setParameter('status', status);
        }
        if (otherParams) {
            Object.keys(otherParams).forEach(key => {
                query
                    .andWhere(`article.${key} LIKE :${key}`)
                    .setParameter(`${key}`, `%${otherParams[key]}%`);
            });
        }
        const [data, total] = await query.getManyAndCount();
        data.forEach(d => {
            if (d.needPassword) {
                delete d.content;
                delete d.html;
            }
        });
        return [data, total];
    }
    async findArticlesByCategory(category, queryParams) {
        const query = this.articleRepository
            .createQueryBuilder('article')
            .leftJoinAndSelect('article.category', 'category')
            .where('category.value=:value', { value: category })
            .orderBy('article.publishAt', 'DESC');
        const { page, pageSize, status } = queryParams;
        query.skip((+page - 1) * +pageSize);
        query.take(+pageSize);
        if (status) {
            query.andWhere('article.status=:status').setParameter('status', status);
        }
        const [data, total] = await query.getManyAndCount();
        data.forEach(d => {
            if (d.needPassword) {
                delete d.content;
                delete d.html;
            }
        });
        return [data, total];
    }
    async findArticlesByTag(tag, queryParams) {
        const query = this.articleRepository
            .createQueryBuilder('article')
            .leftJoinAndSelect('article.tags', 'tag')
            .where('tag.value=:value', { value: tag })
            .orderBy('article.publishAt', 'DESC');
        const { page, pageSize, status } = queryParams;
        query.skip((+page - 1) * +pageSize);
        query.take(+pageSize);
        if (status) {
            query.andWhere('article.status=:status').setParameter('status', status);
        }
        const [data, total] = await query.getManyAndCount();
        data.forEach(d => {
            if (d.needPassword) {
                delete d.content;
                delete d.html;
            }
        });
        return [data, total];
    }
    async getArchives() {
        const data = await this.articleRepository.find({
            where: { status: 'publish' },
            order: { publishAt: 'DESC' },
        });
        const months = [
            'January',
            'February',
            'March',
            'April',
            'May',
            'June',
            'July',
            'August',
            'September',
            'October',
            'November',
            'December',
        ];
        let ret = {};
        data.forEach(d => {
            const year = new Date(d.publishAt).getFullYear();
            const month = new Date(d.publishAt).getMonth();
            if (d.needPassword) {
                delete d.content;
                delete d.html;
            }
            if (!ret[year]) {
                ret[year] = {};
            }
            if (!ret[year][months[month]]) {
                ret[year][months[month]] = [];
            }
            ret[year][months[month]].push(d);
        });
        return ret;
    }
    async checkPassword(id, { password }) {
        const data = await this.articleRepository
            .createQueryBuilder('article')
            .where('article.id=:id')
            .andWhere('article.password=:password')
            .setParameter('id', id)
            .setParameter('password', password)
            .getOne();
        let pass = !!data;
        return pass ? Object.assign({ pass: !!data }, data) : { pass: false };
    }
    async findById(id, status = null) {
        const query = this.articleRepository
            .createQueryBuilder('article')
            .leftJoinAndSelect('article.category', 'category')
            .leftJoinAndSelect('article.tags', 'tags')
            .where('article.id=:id')
            .orWhere('article.title=:title')
            .setParameter('id', id)
            .setParameter('title', id);
        if (status) {
            query.andWhere('article.status=:status').setParameter('status', status);
        }
        const data = await query.getOne();
        return data;
    }
    async updateById(id, article) {
        const oldArticle = await this.articleRepository.findOne(id);
        let { content, tags, category, status } = article;
        const { html, toc } = content ? markdown_util_1.marked(content) : oldArticle;
        if (tags) {
            tags = await this.tagService.findByIds(('' + tags).split(','));
        }
        let existCategory = await this.categoryService.findById(category);
        const newArticle = Object.assign(Object.assign({}, article), { html, category: existCategory, toc: JSON.stringify(toc), needPassword: !!article.password, publishAt: status === 'publish' ? new Date() : oldArticle.publishAt });
        if (tags) {
            Object.assign(newArticle, { tags });
        }
        const updatedArticle = await this.articleRepository.merge(oldArticle, newArticle);
        return this.articleRepository.save(updatedArticle);
    }
    async updateViewsById(id) {
        const oldArticle = await this.articleRepository.findOne(id);
        const updatedArticle = await this.articleRepository.merge(oldArticle, {
            views: oldArticle.views + 1,
        });
        return this.articleRepository.save(updatedArticle);
    }
    async deleteById(id) {
        const article = await this.articleRepository.findOne(id);
        return this.articleRepository.remove(article);
    }
    async search(keyword) {
        const res = await this.articleRepository
            .createQueryBuilder('article')
            .where('article.title LIKE :keyword')
            .orWhere('article.summary LIKE :keyword')
            .orWhere('article.content LIKE :keyword')
            .setParameter('keyword', `%${keyword}%`)
            .getMany();
        return res;
    }
    async recommend(articleId = null) {
        const query = this.articleRepository
            .createQueryBuilder('article')
            .orderBy('article.publishAt', 'DESC')
            .leftJoinAndSelect('article.category', 'category')
            .leftJoinAndSelect('article.tags', 'tags');
        if (!articleId) {
            query.where('article.status=:status').setParameter('status', 'publish');
            return query.take(6).getMany();
        }
        else {
            const sub = this.articleRepository
                .createQueryBuilder('article')
                .orderBy('article.publishAt', 'DESC')
                .leftJoinAndSelect('article.category', 'category')
                .leftJoinAndSelect('article.tags', 'tags')
                .where('article.id=:id')
                .setParameter('id', articleId);
            const exist = await sub.getOne();
            if (!exist) {
                return query.take(6).getMany();
            }
            const { title, summary } = exist;
            const kw1 = nodejieba.extract(title, topN);
            const kw2 = nodejieba.extract(summary, topN);
            kw1.forEach((kw, i) => {
                let paramKey = `title_` + i;
                if (i === 0) {
                    query.where(`article.title LIKE :${paramKey}`);
                }
                else {
                    query.orWhere(`article.title LIKE :${paramKey}`);
                }
                query.setParameter(paramKey, `%${kw.word}%`);
            });
            kw2.forEach((kw, i) => {
                let paramKey = `summary_` + i;
                if (!kw1.length) {
                    query.where(`article.summary LIKE :${paramKey}`);
                }
                else {
                    query.orWhere(`article.summary LIKE :${paramKey}`);
                }
                query.setParameter(paramKey, `%${kw.word}%`);
            });
            const data = await query.getMany();
            return data.filter(d => d.id !== articleId && d.status === 'publish');
        }
    }
};
ArticleService = __decorate([
    common_1.Injectable(),
    __param(0, typeorm_1.InjectRepository(article_entity_1.Article)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        tag_service_1.TagService,
        category_service_1.CategoryService])
], ArticleService);
exports.ArticleService = ArticleService;
//# sourceMappingURL=article.service.js.map