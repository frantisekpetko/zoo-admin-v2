import { CreateTaskDto } from './dto/create-task.dto';
import { Task } from '../entity/old/task.entity';
import { Repository } from 'typeorm';
import { GetTasksFilterDto } from './dto/get-tasks-filter.dto';
import { User } from '../entity/user.entity';
export declare class TaskRepository extends Repository<Task> {
    private logger;
    getTasks(filterDto: GetTasksFilterDto, user: User): Promise<Task[]>;
    createNewTask(createTaskDto: CreateTaskDto, user: User): Promise<Task>;
}
