import { Photo } from "src/interfaces";
import { User } from "src/modules/user/entities/user.entity";
export declare class Story {
    id: number;
    text: string | null;
    media: Photo | null;
    expiresAt: Date;
    views: User[];
    author: User;
    createdAt: Date;
    updatedAt: Date;
}
