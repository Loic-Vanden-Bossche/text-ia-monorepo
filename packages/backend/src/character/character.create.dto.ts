import { IsNotEmpty, IsString, IsUUID, MaxLength } from "class-validator";
import {ApiProperty} from "@nestjs/swagger";

export default class CharacterCreateDto {
  @ApiProperty({
    description: "The name of the character",
    example: "John Doe",
    required: true,
  })
  @IsNotEmpty()
  @IsString()
  @MaxLength(50)
  name: string;

  @ApiProperty({
    description: "The description of the character",
    example: "John Doe is a hero",
    required: true,
  })
  @IsNotEmpty()
  @IsString()
  @MaxLength(150)
  description: string;

  @ApiProperty({
    description: "The internal description of the character",
    example: "John Doe is a hero",
    required: true,
  })
  @IsNotEmpty()
  @IsString()
  internalDescription: string;
}
