import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { MessageService } from "./message.service";
import { Message } from "./message.entity";
import CreateMessageDto from "./message.create.dto";
import MessageUpdateDto from "./message.update.dto";

@Controller('messages')
export class MessageController {
  constructor(private messageService: MessageService) {}

  @Get()
  findAll(): Promise<Message[]> {
    return this.messageService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<Message> {
    return this.messageService.findOne(id);
  }

  @Post()
  create(@Body() message: CreateMessageDto): Promise<Message> {
    return this.messageService.create(message);
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
