import {BaseEntity, Column, Entity, PrimaryGeneratedColumn} from "typeorm";
import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsUUID } from "class-validator";

@Entity('users')
export class User extends BaseEntity {

  @ApiProperty()
  @IsUUID()
  @IsNotEmpty()
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  @Column()
  name: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  @Column()
  email: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  @Column()
  password: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  @Column()
  role: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  @Column('timestamp')
  created: Date;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  @Column('timestamp')
  updated: Date;
}






