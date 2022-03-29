import { IsEmail, IsNotEmpty, IsString, Length } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export default class UserUpdateDto {
  @IsString()
  @IsNotEmpty()
  @Length(4, 20)
  @ApiProperty({
    description: 'User name',
    example: 'John Doe',
  })
  name: string;

  @IsString()
  @IsNotEmpty()
  @IsEmail()
  @ApiProperty({
    description: 'User email',
    example: 'exemple.test@gmail.com',
  })
  email: string;

  @IsString()
  @IsNotEmpty()
  @Length(6, 20)
  @ApiProperty({
    description: 'User password',
    example: '123456',
  })
  password: string;
}
