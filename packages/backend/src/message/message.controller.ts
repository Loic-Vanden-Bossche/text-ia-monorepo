import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { MessageService } from "./message.service";
import { Message } from "./message.entity";
import MessageCreateDto from "./message.create.dto";
import MessageUpdateDto from "./message.update.dto";
import {IAService} from "./ia.service";
import {DialogService} from "../dialog/dialog.service";
import {DeleteResult} from "typeorm";

@Controller('messages')
export class MessageController {
  constructor(private messageService: MessageService, private iaService: IAService, private dialogService: DialogService) {}

  @Get()
  findAll(): Promise<Message[]> {
    return this.messageService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<Message> {
    return this.messageService.findOne(id);
  }

  @Post()
  async create(@Body() message: MessageCreateDto): Promise<Message> {
    const dialog = await this.dialogService.findOne(message.dialogId);
    const newMessage = await this.messageService.create(message, dialog);
    this.iaService.triggerMessageGeneration(dialog);
    return newMessage;
  }

  @Post(':dialogId/reset')
  reset(@Param('dialogId') dialogId: string): Promise<DeleteResult> {
    return this.messageService.reset(dialogId);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() message: MessageUpdateDto): Promise<Message> {
    return this.messageService.update(id, message);
  }

  @Delete(':id')
  delete(@Param('id') id: string): Promise<Message> {
    return this.messageService.delete(id);
  }
}
