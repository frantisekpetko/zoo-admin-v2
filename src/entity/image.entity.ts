import {
  JoinColumn,
  ManyToOne,
  BaseEntity,
  Column,
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn
} from 'typeorm';
import { Animal } from './animal.entity';

@Entity({ name: 'image' })
export class Image extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  urlName: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @ManyToOne((type) => Animal, (animal) => animal.images, {
    eager: false,
  })
  @JoinColumn({
    name: 'animal_id',
  })
  animal: Animal;

  @Column({ nullable: true })
  animal_id: number;
}
