import {Body, Controller, Get, Post} from '@nestjs/common';
import {ContextService} from "./context.service";
import ContextCreateDto from "./context.create.dto";
import {Context} from "./context.entity";

@Controller('contexts')
export class ContextController {
  constructor(private contextService: ContextService) {}

  @Get()
  async getGroupedContexts(): Promise<{ [type: string]: string }> {
    return this.contextService.getGroupedContexts();
  }

  @Post()
  createContext(@Body() context: ContextCreateDto): Promise<Context> {
    return this.contextService.createContext(context);
  }
}
