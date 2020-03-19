import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class Crud {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string; // 联系方式

  @Column()
  password: string; // 联系方式

 
  @Column({ type: 'boolean', default: false })
  pass: boolean; // 是否审核通过

  
  @CreateDateColumn({
    type: 'datetime',
    comment: '创建时间',
    name: 'create_at',
  })
  createAt: Date;

  @UpdateDateColumn({
    type: 'datetime',
    comment: '更新时间',
    name: 'update_at',
  })
  updateAt: Date;
}
