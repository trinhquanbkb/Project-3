import { Injectable } from '@nestjs/common';
import * as fs from 'fs-extra';
import * as path from 'path';
import { configs } from 'src/config/configuration';

@Injectable()
export class ImagesService {
    async upload(url: string) {
        if (url.slice(0,5) == 'data:') {
            try {
                const base64Data = url.replace(/^data:image\/\w+;base64,/, '');
                const imageBuffer = Buffer.from(base64Data, 'base64');
                const fileName = `image_${Date.now()}.jpg`;
                const filePath = path.join(__dirname, '..', 'uploads', fileName);
                const imageUrl = `${configs.host}/images/${fileName}`;
                await fs.writeFile(filePath, imageBuffer);
                return imageUrl
            } catch (error) {
                // Xử lý lỗi
                console.log(error)
            }

        }
        else {
            return url
        }
    }
    async delete(fileName: string): Promise<void> {
        const filePath = path.join(__dirname, '..', 'uploads', fileName);

        try {
            await fs.unlink(filePath);
        } catch (error) {
            // Xử lý lỗi
            console.log(error);
        }
    }
}