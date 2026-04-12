"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UploadService = void 0;
const common_1 = require("@nestjs/common");
const cloudinary_1 = require("cloudinary");
const stream_1 = require("stream");
let UploadService = class UploadService {
    constructor() {
        cloudinary_1.v2.config({
            cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
            api_key: process.env.CLOUDINARY_API_KEY,
            api_secret: process.env.CLOUDINARY_API_SECRET,
        });
    }
    async uploadImage(file) {
        if (!process.env.CLOUDINARY_API_SECRET) {
            throw new common_1.InternalServerErrorException('Missing CLOUDINARY_API_SECRET in .env file');
        }
        return new Promise((resolve, reject) => {
            const uploadStream = cloudinary_1.v2.uploader.upload_stream({
                folder: 'azure-kitchen',
                format: 'webp',
                resource_type: 'image',
                width: 2000,
                height: 2000,
                crop: 'limit',
            }, (error, result) => {
                if (error || !result) {
                    console.error('Cloudinary upload error:', error);
                    return reject(new common_1.InternalServerErrorException('Image upload failed'));
                }
                resolve(result.secure_url);
            });
            stream_1.Readable.from(file.buffer).pipe(uploadStream);
        });
    }
    async uploadVideo(file) {
        if (!process.env.CLOUDINARY_API_SECRET) {
            throw new common_1.InternalServerErrorException('Missing CLOUDINARY_API_SECRET in .env file');
        }
        return new Promise((resolve, reject) => {
            const uploadStream = cloudinary_1.v2.uploader.upload_stream({
                folder: 'azure-kitchen/videos',
                resource_type: 'video',
                format: 'mp4',
                quality: 'auto:good',
                transformation: [
                    { width: 1280, height: 720, crop: 'limit' },
                ],
            }, (error, result) => {
                if (error || !result) {
                    console.error('Cloudinary video upload error:', error);
                    return reject(new common_1.InternalServerErrorException('Video upload failed'));
                }
                resolve(result.secure_url);
            });
            stream_1.Readable.from(file.buffer).pipe(uploadStream);
        });
    }
    async deleteByUrl(url) {
        try {
            if (!url || !url.includes('cloudinary.com')) {
                return false;
            }
            const parts = url.split('/');
            const uploadIndex = parts.indexOf('upload');
            if (uploadIndex === -1)
                return false;
            const publicIdWithExt = parts.slice(uploadIndex + 2).join('/');
            const publicId = publicIdWithExt.substring(0, publicIdWithExt.lastIndexOf('.'));
            if (!publicId)
                return false;
            const isVideo = url.includes('/video/upload/');
            const resourceType = isVideo ? 'video' : 'image';
            const result = await cloudinary_1.v2.uploader.destroy(publicId, {
                resource_type: resourceType,
            });
            return result.result === 'ok';
        }
        catch (error) {
            console.error('Failed to delete from Cloudinary:', error);
            return false;
        }
    }
    async deleteImageByUrl(url) {
        return this.deleteByUrl(url);
    }
};
exports.UploadService = UploadService;
exports.UploadService = UploadService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [])
], UploadService);
//# sourceMappingURL=upload.service.js.map