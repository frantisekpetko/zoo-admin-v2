import { TaskStatus } from '../../tasks/task-status.enum';
import { BaseEntity } from 'typeorm';
export declare class Task extends BaseEntity {
    id: number;
    title: string;
    description: string;
    status: TaskStatus;
    userId: number;
    createdAt: Date;
    updatedAt: Date;
}
