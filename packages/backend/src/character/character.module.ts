import { Module } from '@nestjs/common';
import { CharacterService } from './character.service';
import { CharacterController } from './character.controller';
import {FacesService} from "./faces.service";
import {HttpModule} from "@nestjs/axios";
import {TranslationService} from "./translation.service";

@Module({
  imports: [HttpModule],
  providers: [CharacterService, FacesService, TranslationService],
  controllers: [CharacterController],
  exports: [CharacterService, FacesService],
})
export class CharacterModule {}
