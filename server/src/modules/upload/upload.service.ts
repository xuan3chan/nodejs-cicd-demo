import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { v2 as cloudinary } from 'cloudinary';
import { Readable } from 'stream';

@Injectable()
export class UploadService {
  constructor() {
    cloudinary.config({
      cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
      api_key: process.env.CLOUDINARY_API_KEY,
      api_secret: process.env.CLOUDINARY_API_SECRET,
    });
  }

  async uploadImage(file: Express.Multer.File): Promise<string> {
    if (!process.env.CLOUDINARY_API_SECRET) {
      throw new InternalServerErrorException(
        'Missing CLOUDINARY_API_SECRET in .env file',
      );
    }

    return new Promise((resolve, reject) => {
      const uploadStream = cloudinary.uploader.upload_stream(
        {
          folder: 'azure-kitchen',
          format: 'webp',
          resource_type: 'image',
          width: 2000,
          height: 2000,
          crop: 'limit',
        },
        (error, result) => {
          if (error || !result) {
            console.error('Cloudinary upload error:', error);
            return reject(
              new InternalServerErrorException('Image upload failed'),
            );
          }
          resolve(result.secure_url);
        },
      );
      Readable.from(file.buffer).pipe(uploadStream);
    });
  }

  async uploadVideo(file: Express.Multer.File): Promise<string> {
    if (!process.env.CLOUDINARY_API_SECRET) {
      throw new InternalServerErrorException(
        'Missing CLOUDINARY_API_SECRET in .env file',
      );
    }

    return new Promise((resolve, reject) => {
      const uploadStream = cloudinary.uploader.upload_stream(
        {
          folder: 'azure-kitchen/videos',
          resource_type: 'video',
          // Chuyển đổi sang MP4 (H.264) để tương thích mọi trình duyệt
          format: 'mp4',
          // Giới hạn chất lượng để tiết kiệm dung lượng Cloudinary
          quality: 'auto:good',
          // Giới hạn kích thước video (720p max)
          transformation: [{ width: 1280, height: 720, crop: 'limit' }],
        },
        (error, result) => {
          if (error || !result) {
            console.error('Cloudinary video upload error:', error);
            return reject(
              new InternalServerErrorException('Video upload failed'),
            );
          }
          resolve(result.secure_url);
        },
      );
      Readable.from(file.buffer).pipe(uploadStream);
    });
  }

  async deleteByUrl(url: string): Promise<boolean> {
    try {
      if (!url || !url.includes('cloudinary.com')) {
        return false;
      }
      const parts = url.split('/');
      const uploadIndex = parts.indexOf('upload');
      if (uploadIndex === -1) return false;

      const publicIdWithExt = parts.slice(uploadIndex + 2).join('/');
      const publicId = publicIdWithExt.substring(
        0,
        publicIdWithExt.lastIndexOf('.'),
      );

      if (!publicId) return false;

      // Phát hiện loại resource dựa trên URL path
      const isVideo = url.includes('/video/upload/');
      const resourceType = isVideo ? 'video' : 'image';

      const result = (await cloudinary.uploader.destroy(publicId, {
        resource_type: resourceType,
      })) as { result: string };
      return result.result === 'ok';
    } catch (error) {
      console.error('Failed to delete from Cloudinary:', error);
      return false;
    }
  }

  // Giữ lại alias cho backward compatibility
  async deleteImageByUrl(url: string): Promise<boolean> {
    return this.deleteByUrl(url);
  }
}
