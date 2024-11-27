import { OneToMany, UpdateDateColumn } from 'typeorm';
import { CreateDateColumn } from 'typeorm';
import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { Image } from './image.entity';
import { Extlink } from './extlink.entity';

@Entity({ name: 'animal' })
export class Animal extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  latinname: string;

  @Column()
  description: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @OneToMany((type) => Image, (image) => image.animal, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  images: Image[];

  @OneToMany((type) => Extlink, (extlink) => extlink.animal, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  extlinks: Extlink[];



}
