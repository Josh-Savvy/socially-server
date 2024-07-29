import { User } from './User';
export declare class Notification {
    id: number;
    type: string;
    message: string;
    recipient: User;
    read: boolean;
    createdAt: Date;
    updatedAt: Date;
}
