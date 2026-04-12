export declare class UploadService {
    constructor();
    uploadImage(file: Express.Multer.File): Promise<string>;
    uploadVideo(file: Express.Multer.File): Promise<string>;
    deleteByUrl(url: string): Promise<boolean>;
    deleteImageByUrl(url: string): Promise<boolean>;
}
