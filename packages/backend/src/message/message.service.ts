import { Injectable } from '@nestjs/common';
import { Message } from "./message.entity";
import { DialogService } from "../dialog/dialog.service";

import MessageCreateDto from "./message.create.dto";
import MessageUpdateDto from "./message.update.dto";

@Injectable()
export class MessageService {

  constructor(private dialogService: DialogService) {}

  findAll(): Promise<Message[]> {
    return Message.find();
  }

  findOne(id: string): Promise<Message> {
    return Message.findOne(id);
  }

  async create(message: MessageCreateDto): Promise<Message> {
    const newMessage = new Message();
    newMessage.text = message.text;
    newMessage.dialog = await this.dialogService.findOne(message.dialogId);

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