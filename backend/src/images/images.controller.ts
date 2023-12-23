import { Controller, Get, Param, Res } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Response } from 'express';
import * as fs from 'fs-extra';
import * as path from 'path';

@Controller('images')
@ApiTags('images')
export class ImagesController {
    @Get(':filename')
    async getImage(@Param('filename') filename: string, @Res() res: Response) {
      // Kiểm tra xem tên file có chứa .. hay không
      if (filename.includes('..')) {
        throw new Error('Tên file không hợp lệ');
      }

      const fileExtension = path.extname(filename).toLowerCase();
      const allowedExtensions = ['.jpg', '.jpeg', '.png', '.gif']; // Thêm các định dạng mở rộng khác nếu cần
  
      const isValidExtension = allowedExtensions.some(ext => fileExtension.endsWith(ext));
      if (!isValidExtension) {
        throw new Error('Định dạng file không hỗ trợ');
      }

      const filePath = path.join(__dirname, '..', 'uploads', filename);
      
      try {
        const exists = await fs.pathExists(filePath);
        if (!exists) {
          throw new Error('Không tìm thấy ảnh');
        }        

        res.sendFile(filePath);
      } catch (error) {
        // Xử lý lỗi
        throw new Error('Không thể lấy ảnh');
      }
    }
}
