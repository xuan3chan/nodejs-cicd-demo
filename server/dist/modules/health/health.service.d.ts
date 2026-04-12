import { DataSource } from 'typeorm';
export declare class HealthService {
    private readonly dataSource;
    constructor(dataSource: DataSource);
    check(): Promise<{
        status: string;
        timestamp: string;
        service: string;
        version: string;
        database: string;
    }>;
}
