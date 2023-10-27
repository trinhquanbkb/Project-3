import { Module } from '@nestjs/common';
import { ImagesController } from './images.controller';
import { ImagesService } from './images.service';
import { MulterModule } from '@nestjs/platform-express';

@Module({
    imports: [MulterModule.register({
        dest: './uploads',
    })],
    controllers: [ImagesController],
    providers: [ImagesService],
    exports: [ImagesService],

})
export class ImagesModule { }
