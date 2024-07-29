import { StoryService } from './story.service';
import { CreateStoryDto } from './dto/create-story.dto';
import { UpdateStoryDto } from './dto/update-story.dto';
export declare class StoryController {
    private readonly storyService;
    constructor(storyService: StoryService);
    create(createStoryDto: CreateStoryDto): string;
    findAll(): string;
    findOne(id: string): string;
    update(id: string, updateStoryDto: UpdateStoryDto): string;
    remove(id: string): string;
}
