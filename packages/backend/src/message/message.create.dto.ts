import { IsNotEmpty, IsString, IsUUID, MaxLength } from "class-validator";

export default class CreateMessageDto {

  @IsString()
  @IsNotEmpty()
  @MaxLength(150)
  text: string;

  @IsString()
  @IsNotEmpty()
  @IsUUID()
  userId: string;
}
