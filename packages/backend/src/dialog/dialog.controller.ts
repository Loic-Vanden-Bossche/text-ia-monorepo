import {Body, Controller, Delete, Get, Param, Post, Put} from '@nestjs/common';
import {DialogService} from "./dialog.service";
import DialogUpdateDto from "./dialog.update.dto";
import DialogCreateDto from "./dialog.create.dto";

@Controller('dialogs')
export class DialogController {
  constructor(private dialogService: DialogService) {}

  @Get()
  getDialogs() {
    return this.dialogService.findAll();
  }

  @Get(':id')
  getDialog(@Param('id') id: string) {
    return this.dialogService.findOne(id);
  }

  @Get(':id/messages')
  getMessages(@Param('id') id: string) {
    return this.dialogService.findMessages(id);
  }

  @Post()
  createDialog(@Body() dialog: DialogCreateDto) {
    return this.dialogService.create(dialog);
  }

  @Put(':id')
  updateDialog(@Param('id') id: string, @Body() dialog: DialogUpdateDto) {
    return this.dialogService.update(id, dialog);
  }

  @Delete(':id')
  deleteDialog(@Param('id') id: string) {
    return this.dialogService.delete(id);
  }

}
