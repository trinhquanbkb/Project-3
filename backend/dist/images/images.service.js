"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ImagesService = void 0;
const common_1 = require("@nestjs/common");
const fs = require("fs-extra");
const path = require("path");
const configuration_1 = require("../config/configuration");
let ImagesService = class ImagesService {
    async upload(url) {
        if (url.slice(0, 5) == 'data:') {
            try {
                const base64Data = url.replace(/^data:image\/\w+;base64,/, '');
                const imageBuffer = Buffer.from(base64Data, 'base64');
                const fileName = `image_${Date.now()}.jpg`;
                const filePath = path.join(__dirname, '..', 'uploads', fileName);
                const imageUrl = `${configuration_1.configs.host}/images/${fileName}`;
                await fs.writeFile(filePath, imageBuffer);
                return imageUrl;
            }
            catch (error) {
                console.log(error);
            }
        }
        else {
            return url;
        }
    }
    async delete(fileName) {
        const filePath = path.join(__dirname, '..', 'uploads', fileName);
        try {
            await fs.unlink(filePath);
        }
        catch (error) {
            console.log(error);
        }
    }
};
ImagesService = __decorate([
    (0, common_1.Injectable)()
], ImagesService);
exports.ImagesService = ImagesService;
//# sourceMappingURL=images.service.js.map