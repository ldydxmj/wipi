import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from '../auth/auth.module';
import { ArticleModule } from '../article/article.module';
import { SettingModule } from '../setting/setting.module';
import { SMTPModule } from '../smtp/smtp.module';
import { UserModule } from '../user/user.module';
import { CrudService } from './crud.service';
import { CrudController } from './crud.controller';
import { Crud } from './crud.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Crud]),
    AuthModule,
    ArticleModule,
    SettingModule,
    SMTPModule,
    UserModule,
  ],
  providers: [CrudService],
  controllers: [CrudController],
})
export class CrudModule {}
