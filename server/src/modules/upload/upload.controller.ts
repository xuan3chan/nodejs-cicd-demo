import { Controller, Post, Delete, Body, UseInterceptors, UploadedFile, UseGuards, BadRequestException } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { UploadService } from './upload.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('api/upload')
export class UploadController {
  constructor(private readonly uploadService: UploadService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  @UseInterceptors(FileInterceptor('image', {
    limits: { fileSize: 5 * 1024 * 1024 }, // 5MB limit
  }))
  async uploadImage(@UploadedFile() file: Express.Multer.File) {
    if (!file) {
      throw new BadRequestException('No image file provided');
    }
    
    if (!file.mimetype.startsWith('image/')) {
        throw new BadRequestException('Only image files are allowed');
    }

    const url = await this.uploadService.uploadImage(file);
    return { url };
  }

  @UseGuards(JwtAuthGuard)
  @Post('video')
  @UseInterceptors(FileInterceptor('video', {
    limits: { fileSize: 100 * 1024 * 1024 }, // 100MB limit cho video
  }))
  async uploadVideo(@UploadedFile() file: Express.Multer.File) {
    if (!file) {
      throw new BadRequestException('No video file provided');
    }

    if (!file.mimetype.startsWith('video/')) {
      throw new BadRequestException('Only video files are allowed');
    }

    const url = await this.uploadService.uploadVideo(file);
    return { url };
  }

  @UseGuards(JwtAuthGuard)
  @Delete()
  async deleteFile(@Body('url') url: string) {
    if (!url) {
      throw new BadRequestException('No URL provided');
    }
    const success = await this.uploadService.deleteByUrl(url);
    if (!success) {
      throw new BadRequestException('Failed to delete file');
    }
    return { message: 'File deleted' };
  }
}
