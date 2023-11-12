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
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const lodash_1 = require("lodash");
const users_service_1 = require("../../users/services/users.service");
const jwt_1 = require("@nestjs/jwt");
const bcrypt_1 = require("bcrypt");
const configuration_1 = require("../../config/configuration");
let AuthService = class AuthService {
    constructor(userService, jwtService) {
        this.userService = userService;
        this.jwtService = jwtService;
    }
    async signUp(data) {
        data.password = (0, bcrypt_1.hashSync)(data.password, configuration_1.configs.saltOrRound);
        return await this.userService.create(data);
    }
    async signIn(data) {
        const user = await this.userService.findOne({ email: data.email });
        const credential = (0, lodash_1.omit)(user.toObject(), [
            'password',
            'createdAt',
            'updatedAt',
            '__v',
        ]);
        const accessToken = await this.jwtService.signAsync(credential);
        return { accessToken, credential };
    }
    async checkIfDataSeeded() {
        const adminUser = await this.userService.findOne({ email: 'admin@gmail.com' });
        return !!adminUser;
    }
};
AuthService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [users_service_1.UsersService,
        jwt_1.JwtService])
], AuthService);
exports.AuthService = AuthService;
//# sourceMappingURL=auth.service.js.map