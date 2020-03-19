import {
  Controller,
  Get,
  Post,
  Patch,
  Delete,
  Param,
  Query,
  HttpStatus,
  HttpCode,
  Body,
  UseGuards,
  Request,
  Req,
} from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { RolesGuard, Roles } from '../auth/roles.guard';
import { CrudService } from './crud.service';
import { Crud } from './crud.entity';

@Controller('crud')
// @UseGuards(RolesGuard)
export class CrudController {
  constructor(private readonly crudService: CrudService) {}

 

    /**
   * 创建文章
   * @param people
   */
  @Post()
  // @Roles('admin')
  @UseGuards(JwtAuthGuard)
  create(@Body() people) {
    return this.crudService.add(people);
  }
   /**
   * 获取所有文章
   */
  @Get()
  @HttpCode(HttpStatus.OK)
  findAll(@Query() queryParams) {
    return this.crudService.findAll(queryParams);
  }

  /**
   * 获取指定标签
   * @param id
   */
  @Post('getCrudDetail')
  findById(@Body('id')id) {
    return this.crudService.findById(id);
  }

 /**
   * 更新标签
   * @param id
   * @param crud
   */
  @Patch(':id')
  @UseGuards(JwtAuthGuard)
  updateById(@Param('id') id, @Body() crud) {
    return this.crudService.updateById(id, crud);
  }

   /**
   * 删除标签
   * @param id
   */
  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  deleteById(@Param('id') id) {
    return this.crudService.deleteById(id);
  }
}
