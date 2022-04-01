import { IsNotEmpty, IsString, IsUUID, MaxLength } from "class-validator";
import {ApiProperty} from "@nestjs/swagger";

export default class DialogCreateDto {
  @IsUUID()
  @IsNotEmpty()
  @ApiProperty({
    description: 'Dialog context id',
    example: '5e9f8f8f-8f8f-8f8f-8f8f-8f8f8f8f8f8f',
  })
  contextId: string;

  @IsUUID()
  @IsNotEmpty()
  @ApiProperty({
    description: 'User id',
    example: '5e9f8f8f-8f8f-8f8f-8f8f-8f8f8f8f8f8f',
  })
  userId: string;

  @IsUUID()
  @IsNotEmpty()
  @ApiProperty({
    description: 'Character id',
    example: '5e9f8f8f-8f8f-8f8f-8f8f-8f8f8f8f8f8f',
  })
  characterId: string;
}
