import { AppService } from './app.service';
export declare class AppController {
    private readonly appService;
    constructor(appService: AppService);
    getHello(): {
        message: string;
        server_date: string;
    };
    getCurrencies(): import("./constants").Currency[];
}
