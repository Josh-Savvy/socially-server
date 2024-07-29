import { CreateStoryDto } from './dto/create-story.dto';
import { UpdateStoryDto } from './dto/update-story.dto';
export declare class StoryService {
    create(createStoryDto: CreateStoryDto): string;
    findAll(): string;
    findOne(id: number): string;
    update(id: number, updateStoryDto: UpdateStoryDto): string;
    remove(id: number): string;
}
