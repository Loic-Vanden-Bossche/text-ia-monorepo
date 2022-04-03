import { Module } from '@nestjs/common';
import { MessageController } from './message.controller';
import { MessageService } from './message.service';
import { DialogService } from "../dialog/dialog.service";
import {UserService} from "../user/user.service";
import {IAService} from "./ia.service";
import {HttpModule} from "@nestjs/axios";
import {MessageGateway} from "./message.gateway";

@Module({
  imports: [HttpModule],
  controllers: [MessageController],
  providers: [MessageService, DialogService, UserService, MessageGateway, IAService]
})
export class MessageModule {}
