import { IsEmail, IsNotEmpty, IsOptional, IsString, Length } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export default class UserCreateDto {
  @IsString()
  @IsNotEmpty()
  @Length(4, 20)
  @IsOptional()
  @ApiProperty({
    description: 'User name',
    example: 'John Doe',
  })
  name: string;

  @IsString()
  @IsNotEmpty()
  @IsEmail()
  @IsOptional()
  @ApiProperty({
    description: 'User email',
    example: 'exemple.test@gmail.com',
  })
  email: string;

  @IsString()
  @IsNotEmpty()
  @Length(6, 20)
  @IsOptional()
  @ApiProperty({
    description: 'User password',
    example: '123456',
  })
  password: string;
}
