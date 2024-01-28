import { ApiBearerAuth, ApiQuery, ApiTags } from '@nestjs/swagger';
import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Query,
  Req,
} from '@nestjs/common';
import { UsersService } from '../services/users.service';
import { CreateUserDto } from '../dto/create-user.dto';
import { UpdateUserDto } from '../dto/update-user.dto';
import { JwtAuthGuard } from 'src/auth/guards/jwt.guard';
import { FilterQuery } from 'mongoose';
import * as jwt from 'jsonwebtoken';

@Controller('users')
@ApiTags('Users')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth('authorization')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  @ApiQuery({
    name: 'page',
    type: Number,
    required: false,
    description: 'Page number',
  })
  @ApiQuery({
    name: 'pageSize',
    type: Number,
    required: false,
    description: 'Page size',
  })
  @ApiQuery({
    name: 'filter',
    type: String,
    required: false,
    description: 'Filter',
  })
  async findAll(
    @Req() req: any,
    @Query() pagination: any,
    @Query('filter') filter: string,
  ) {
    return this.usersService.findAll(
      req,
      pagination,
      JSON.parse(filter ? filter : '{}'),
    );
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.usersService.findOne({ _id: id });
  }

  @Get('/user-logged')
  findLogged(@Req() req: any) {
    const token = req.headers.authorization.replace('Bearer ', '');
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
    console.log(decodedToken);
    const id: string = decodedToken['_id']._id;
    return this.usersService.findOne({ _id: id });
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(id, updateUserDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.usersService.remove(id);
  }
}
