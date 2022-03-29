import { IsNotEmpty, IsString, MaxLength } from "class-validator";
import {ApiProperty} from "@nestjs/swagger";

export default class DialogUpdateDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(500)
  @ApiProperty({
    description: 'Dialog context',
    maxLength: 500,
    example: 'This is a simple dialog between 2 persons',
  })
  context: string;
}
