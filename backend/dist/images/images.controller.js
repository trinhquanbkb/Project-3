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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ImagesController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const fs = require("fs-extra");
const path = require("path");
let ImagesController = class ImagesController {
    async getImage(filename, res) {
        const filePath = path.join(__dirname, '..', 'uploads', filename);
        try {
            const exists = await fs.pathExists(filePath);
            if (!exists) {
                throw new Error('Không tìm thấy ảnh');
            }
            res.sendFile(filePath);
        }
        catch (error) {
            throw new Error('Không thể lấy ảnh');
        }
    }
};
__decorate([
    (0, common_1.Get)(':filename'),
    __param(0, (0, common_1.Param)('filename')),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], ImagesController.prototype, "getImage", null);
ImagesController = __decorate([
    (0, common_1.Controller)('images'),
    (0, swagger_1.ApiTags)('images')
], ImagesController);
exports.ImagesController = ImagesController;
//# sourceMappingURL=images.controller.js.map