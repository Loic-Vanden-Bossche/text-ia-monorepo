import { IsNotEmpty, IsString, MaxLength } from "class-validator";
import {ApiProperty} from "@nestjs/swagger";

export default class MessageUpdateDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(150)
  @ApiProperty({
    description: 'Message text',
    maxLength: 150,
    example: 'Hello world',
  })
  text: string;
}
