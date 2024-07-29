import { CreateNotificaionDto } from './dto/create-notificaion.dto';
import { UpdateNotificaionDto } from './dto/update-notificaion.dto';
export declare class NotificaionsService {
    create(createNotificaionDto: CreateNotificaionDto): string;
    findAll(): string;
    findOne(id: number): string;
    update(id: number, updateNotificaionDto: UpdateNotificaionDto): string;
    remove(id: number): string;
}
