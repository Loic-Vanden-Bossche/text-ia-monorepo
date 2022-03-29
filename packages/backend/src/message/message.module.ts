import { Module } from '@nestjs/common';
import { MessageController } from './message.controller';
import { MessageService } from './message.service';
import { DialogService } from "../dialog/dialog.service";

@Module({
  controllers: [MessageController],
  providers: [MessageService, DialogService]
})
export class MessageModule {}
