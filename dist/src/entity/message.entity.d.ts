import { BaseEntity } from 'typeorm';
export declare class Message extends BaseEntity {
    id: number;
    message: string;
    sender: string;
}
