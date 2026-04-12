import { Response, Request } from 'express';
import { AppService } from './app.service';
export declare class AppController {
    private readonly appService;
    constructor(appService: AppService);
    root(req: Request, res: Response): void | Response<any, Record<string, any>>;
}
