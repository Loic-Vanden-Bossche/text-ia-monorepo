import { IsNotEmpty, IsString, MaxLength } from "class-validator";

export default class MessageUpdateDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(150)
  text: string;
}
