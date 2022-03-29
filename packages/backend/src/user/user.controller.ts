import {Body, Controller, Delete, Get, Param, Post, Put} from '@nestjs/common';
import { UserService } from "./user.service";
import { User } from "./user.entity";
import UserCreateDto from "./user.create.dto";
import UserUpdateDto from "./user.update.dto";

@Controller('users')
export class UserController {
  constructor(private userService: UserService) {}

  @Get() getAllUsers(): Promise<User[]> {
    return this.userService.findAll();
  }

  @Get(':id') getUser(@Param('id') id: string): Promise<User> {
    return this.userService.findOne(id);
  }

  @Post() createUser(@Body() user: UserCreateDto): Promise<User> {
    return this.userService.create(user);
  }

  @Put(':id') updateUser(@Param('id') id: string, @Body() user: UserUpdateDto): Promise<User> {
    return this.userService.update(id, user);
  }

  @Delete(':id') deleteUser(@Param('id') id: string): Promise<User> {
    return this.userService.delete(id);
  }

}
