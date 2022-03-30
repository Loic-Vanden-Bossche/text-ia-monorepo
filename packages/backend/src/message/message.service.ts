import {BadRequestException, Injectable} from '@nestjs/common';
import { Message } from "./message.entity";

import MessageCreateDto from "./message.create.dto";
import MessageUpdateDto from "./message.update.dto";
import {Dialog} from "../dialog/dialog.entity";
import {DeleteResult} from "typeorm";

@Injectable()
export class MessageService {

  constructor() {}

  findAll(): Promise<Message[]> {
    return Message.find();
  }

  findOne(id: string): Promise<Message> {
    return Message.findOne(id);
  }

  async create(message: MessageCreateDto, dialog: Dialog, iaGenerated = false): Promise<Message> {

    if (!dialog) throw new BadRequestException('Dialog not found');

    return await Message.create({ ...message, iaGenerated, dialog }).save()

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

  reset(dialogId: string): Promise<DeleteResult> {
    return Message.delete({ dialog: { id: dialogId } });
  }

}
