import { getPageObj } from 'src/utils/utils';
import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { SMTPService } from '../smtp/smtp.service';
import { ArticleService } from '../article/article.service';
import { SettingService } from '../setting/setting.service';
import { UserService } from '../user/user.service';
import { marked } from '../article/markdown.util';
import { Crud } from './crud.entity';



@Injectable()
export class CrudService {
  constructor(
    @InjectRepository(Crud)
    private readonly crudRepository: Repository<Crud>,
  ) { }



  /**
   * 查询所有评论
   * 额外添加文章信息
   */
  async add(crud: Partial<Crud>): Promise<Crud> {

    const { name } = crud;
    const exist = await this.crudRepository.findOne({ where: { name } });

    if (exist) {
      throw new HttpException('文章标题已存在', HttpStatus.BAD_REQUEST);
    }


    const newCrud = await this.crudRepository.create({
      ...crud,

    });
    await this.crudRepository.save(newCrud);
    return newCrud;
  }
  /**
   * 查询所有评论
   * 额外添加文章信息
   */
  async findAll(queryParams: any = {}): Promise<Object> {


    const query = this.crudRepository
      .createQueryBuilder('crud')
      .orderBy('crud.createAt', 'DESC');
    const { pageNumber = 1, pageSize = 12, status, ...otherParams } = queryParams;
    query.skip((+pageNumber - 1) * +pageSize);
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
    const myhello = await query.getManyAndCount();
    console.log("CrudService -> myhello", myhello)
    const [data, total] = myhello;
    let pageData = {
      currentPage: pageNumber,
      pageSize: pageSize,
      total: total,
      data: data
    }
    return getPageObj(pageData);
  }
  async findById(id): Promise<Crud> {
    return this.crudRepository.findOne(id);
  }
  /**
  * 更新分类
  * @param id
  * @param Category
  */
  async updateById(id, crud: Partial<Crud>): Promise<Crud> {
    const oldCrud = await this.crudRepository.findOne(id);
    const updatedCrud = await this.crudRepository.merge(
      oldCrud,
      crud
    );
    return this.crudRepository.save(updatedCrud);
  }

  /**
   * 删除分类
   * @param id
   */
  async deleteById(id) {
    const crud = await this.crudRepository.findOne(id);
    return this.crudRepository.remove(crud);
  }

}
