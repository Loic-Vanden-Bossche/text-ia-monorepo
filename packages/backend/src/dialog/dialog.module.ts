import { Module } from '@nestjs/common';
import { DialogService } from './dialog.service';
import { DialogController } from './dialog.controller';
import {UserService} from "../user/user.service";

@Module({
  providers: [DialogService, UserService],
  controllers: [DialogController]
})
export class DialogModule {}
