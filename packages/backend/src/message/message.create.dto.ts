import { IsNotEmpty, IsString, IsUUID, MaxLength } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export default class MessageCreateDto {

  @IsString()
  @IsNotEmpty()
  @MaxLength(150)
  @ApiProperty({
    description: 'The message content',
    maxLength: 150,
    example: 'Hello world',
  })
  text: string;

  @IsString()
  @IsNotEmpty()
  @IsUUID()
  @ApiProperty({
    description: 'The dialog id',
    example: '12345678-1234-1234-1234-123456789012',
  })
  dialogId: string;
}
