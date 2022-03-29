import { Injectable } from '@nestjs/common';
import { User } from "./user.entity";
import UserUpdateDto from "./user.update.dto";
import UserCreateDto from "./user.create.dto";

@Injectable()
export class UserService {
  constructor() {}

  findAll(): Promise<User[]> {
    return User.find();
  }

  findOne(id: string): Promise<User> {
    return User.findOne(id);
  }

  async create(user: UserCreateDto): Promise<User> {
    return User.create(user).save();
  }

  async update(id: string, user: UserUpdateDto): Promise<User> {
    const userToUpdate = await User.findOne(id);
    userToUpdate.name = user.name;
    userToUpdate.email = user.email;
    userToUpdate.password = user.password;
    return await userToUpdate.save();
  }

  async delete(id: string): Promise<User> {
    const userToDelete = await User.findOne(id);
    return await userToDelete.remove();
  }
}
