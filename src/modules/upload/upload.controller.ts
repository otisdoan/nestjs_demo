import {
  Controller,
  Post,
  UseInterceptors,
  UploadedFile,
  BadRequestException,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { UploadService } from './upload.service';

@Controller('upload')
export class UploadController {
  constructor(private readonly uploadService: UploadService) {}

  @Post()
  @UseInterceptors(FileInterceptor('file'))
  async uploadFile(@UploadedFile() file: Express.Multer.File) {
    if (!file) {
      throw new BadRequestException('File is required');
    }

    try {
      const result = await this.uploadService.uploadFile(file);
      return {
        success: true,
        message: 'File uploaded successfully',
        data: {
          url: result.secure_url,
          publicId: result.public_id,
        },
      };
    } catch (error) {
      throw new BadRequestException('Failed to upload file');
    }
  }
}
