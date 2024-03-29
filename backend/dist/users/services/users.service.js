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
exports.UsersService = void 0;
const common_1 = require("@nestjs/common");
const user_repository_1 = require("../repository/user.repository");
const configuration_1 = require("../../config/configuration");
const bcrypt_1 = require("bcrypt");
const jwt = require("jsonwebtoken");
let UsersService = class UsersService {
    constructor(usersRepository) {
        this.usersRepository = usersRepository;
    }
    async create(createUserDto) {
        createUserDto.password = (0, bcrypt_1.hashSync)(createUserDto.password, configuration_1.configs.saltOrRound);
        return await this.usersRepository.create(createUserDto);
    }
    async findAll(req, pagination, filter) {
        const { page, pageSize } = pagination;
        const skip = (page - 1) * pageSize;
        const token = req.headers.authorization.replace('Bearer ', '');
        const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
        let warehouseId;
        if (decodedToken['role_id'].name === 'Admin') {
            warehouseId = null;
        }
        else {
            warehouseId = decodedToken['warehouse_id']._id;
        }
        let filterData = {};
        if (filter.username !== '') {
            filterData['username'] = filter.username;
        }
        if (filter.role_id !== '') {
            filterData['role_id'] = filter.role_id;
        }
        if (filter.email !== '') {
            filterData['email'] = filter.email;
        }
        if (warehouseId) {
            filterData['warehouse_id'] = warehouseId;
        }
        else {
            delete filterData['warehouse_id'];
        }
        const data = await this.usersRepository.findAll(filterData, skip, parseInt(pageSize, 10));
        const total = await this.usersRepository.countAll(filterData);
        const paginations = {
            page: page,
            pageSize: pageSize,
            total: total,
            totalPage: Math.ceil(total / pageSize) || 0,
        };
        return { data, paginations, messenger: 'success' };
    }
    async findOne(filter) {
        return await this.usersRepository.findOne(filter);
    }
    async findUserLogged(filter) {
        return await this.usersRepository.findOne(filter);
    }
    async update(id, updateUserDto) {
        return await this.usersRepository.update(id, updateUserDto);
    }
    async remove(id) {
        const removeUser = await this.usersRepository.delete(id);
        if (removeUser) {
            return removeUser;
        }
        else {
            return {
                error: 'error delete user',
            };
        }
    }
};
UsersService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [user_repository_1.UsersRepository])
], UsersService);
exports.UsersService = UsersService;
//# sourceMappingURL=users.service.js.map