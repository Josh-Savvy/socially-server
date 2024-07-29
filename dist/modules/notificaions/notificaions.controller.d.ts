import { NotificaionsService } from './notificaions.service';
import { CreateNotificaionDto } from './dto/create-notificaion.dto';
import { UpdateNotificaionDto } from './dto/update-notificaion.dto';
export declare class NotificaionsController {
    private readonly notificaionsService;
    constructor(notificaionsService: NotificaionsService);
    create(createNotificaionDto: CreateNotificaionDto): string;
    findAll(): string;
    findOne(id: string): string;
    update(id: string, updateNotificaionDto: UpdateNotificaionDto): string;
    remove(id: string): string;
}
