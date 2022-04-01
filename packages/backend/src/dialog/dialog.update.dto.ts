import {IsNotEmpty, IsString, IsUUID, MaxLength} from "class-validator";
import {ApiProperty} from "@nestjs/swagger";
import {Context} from "../context/context.entity";

export default class DialogUpdateDto {
  @IsString()
  @IsNotEmpty()
  @IsUUID()
  @ApiProperty({
    description: 'Dialog context id',
    example: '5e9f8f8f-8f8f-8f8f-8f8f-8f8f8f8f8f8f',
  })
  contextId: string;
}
