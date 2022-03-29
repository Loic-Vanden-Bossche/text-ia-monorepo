import { Injectable } from '@nestjs/common';
import { Message } from "./message.entity";
import CreateMessageDto from "./message.create.dto";
import MessageUpdateDto from "./message.update.dto";
import { UserService } from "../user/user.service";

@Injectable()
export class MessageService {

  constructor(private userService: UserService) {}

  findAll(): Promise<Message[]> {
    return Message.find();
  }

  findOne(id: string): Promise<Message> {
    return Message.findOne(id);
  }

  async create(message: CreateMessageDto): Promise<Message> {
    const newMessage = new Message();
    newMessage.text = message.text;
    newMessage.user = await this.userService.findOne(message.userId);

    return await newMessage.save();
  }

  async update(id: string, message: MessageUpdateDto): Promise<Message> {
    const messageToUpdate = await Message.findOne(id);
    messageToUpdate.text = message.text;
    return await messageToUpdate.save();
  }

  async delete(id: string): Promise<Message> {
    const messageToDelete = await Message.findOne(id);
    return await messageToDelete.remove();
  }

}
