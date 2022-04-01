import { IsNotEmpty, IsString, MaxLength } from "class-validator";
import {ApiProperty} from "@nestjs/swagger";

export default class ContextCreateDto {

  @ApiProperty({
    description: "The name of the dialog",
    example: "classic dialog",
    required: true,
  })
  @IsNotEmpty()
  @IsString()
  @MaxLength(20)
  name: string;

  @ApiProperty({
    description: "The description of the dialog",
    example: "This is a dialog",
    required: true,
  })
  @IsNotEmpty()
  @IsString()
  @MaxLength(1500)
  description: string;

  @ApiProperty({
    description: "The description of the dialog",
    example: "This is a dialog",
    required: true,
  })
  @IsNotEmpty()
  @IsString()
  @MaxLength(1500)
  internalDescription: string;

  @ApiProperty({
    description: 'The type of the context.',
    example: 'normal',
  })
  @IsNotEmpty()
  @IsString()
  @MaxLength(20)

  type: string;
}
