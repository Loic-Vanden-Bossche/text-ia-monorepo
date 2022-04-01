import {IsNotEmpty, IsNumber, IsString, Max, MaxLength, Min} from "class-validator";
import {ApiProperty} from "@nestjs/swagger";

export default class CharacterCreateDto {

  @ApiProperty({
    description: "The description of the character",
    example: "John Doe is a hero",
    required: true,
  })
  @IsNotEmpty()
  @IsString()
  @MaxLength(1500)
  description: string;

  @ApiProperty({
    description: 'The firstname of the character',
    example: 'John',
  })
  @IsNotEmpty()
  @IsString()
  @MaxLength(50)
  firstName: string;

  @ApiProperty({
    description: 'The lastname of the character',
    example: 'Doe',
  })
  @IsNotEmpty()
  @IsString()
  @MaxLength(50)
  lastname: string;

  @ApiProperty({
    description: 'The image url of the character',
    example: 'https://example.com/image.png',
  })
  @IsNotEmpty()
  @IsString()
  @MaxLength(255)
  image: string;

  @ApiProperty({
    description: 'The age of the character',
    example: 20,
  })
  @IsNotEmpty()
  @IsNumber()
  @Max(100)
  @Min(1)
  age: number;

  @ApiProperty({
    description: 'The eye color of the character',
    example: 'blue',
  })
  @IsNotEmpty()
  @IsString()
  @MaxLength(50)
  eyeColor: string;

  @ApiProperty({
    description: 'The hair color of the character',
    example: 'blond',
  })
  @IsNotEmpty()
  @IsString()
  @MaxLength(50)
  hairColor: string;

  @ApiProperty({
    description: 'The hair length of the character',
    example: 'long',
  })
  @IsNotEmpty()
  @IsString()
  @MaxLength(50)
  hairLength: string;

  @ApiProperty({
    description: 'The skin color of the character',
    example: 'white',
  })
  @IsNotEmpty()
  @IsString()
  @MaxLength(50)
  color: string;

  @ApiProperty({
    description: 'The sex of the character',
    example: 'male',
  })
  @IsNotEmpty()
  @IsString()
  @MaxLength(50)
  sex: string;
}
