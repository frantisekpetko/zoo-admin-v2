import { TaskStatus } from './../task-status.enum';
import { ArgumentMetadata, PipeTransform } from '@nestjs/common';
export declare class TaskStatusValidation implements PipeTransform {
    readonly allowedStatutes: TaskStatus[];
    transform(value: any, { metatype }: ArgumentMetadata): any;
    private isStatusValid;
}
