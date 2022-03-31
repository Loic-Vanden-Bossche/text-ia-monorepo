import { IsNotEmpty, IsString, IsUUID, MaxLength } from "class-validator";
import {ApiProperty} from "@nestjs/swagger";

export default class DialogCreateDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(500)
  @ApiProperty({
    description: 'Dialog context',
    maxLength: 500,
    example: 'This is a simple dialog between 2 persons',
  })
  context: string;

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
// 60eeac70-0504-4240-a0ce-52730f5aaf9e
