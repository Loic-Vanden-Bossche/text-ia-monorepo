import { Module } from '@nestjs/common';
import { MessageController } from './message.controller';
import { MessageService } from './message.service';
import { DialogService } from "../dialog/dialog.service";
import {UserService} from "../user/user.service";

@Module({
  controllers: [MessageController],
  providers: [MessageService, DialogService, UserService]
})
export class MessageModule {}
