import {BaseEntity, Column, Entity, ManyToOne, PrimaryGeneratedColumn} from "typeorm";
import { ApiProperty } from '@nestjs/swagger';
import {User} from "../user/user.entity";

@Entity('messages')
export class Message extends BaseEntity {

  @PrimaryGeneratedColumn('uuid')
  @ApiProperty({
    description: 'The unique identifier of the message',
    example: '5e9f8f8f-8f8f-8f8f-8f8f-8f8f8f8f8f8f',
  })
  id: string;

  @Column()
  @ApiProperty({
    description: 'The message content',
    example: 'Hello world',
  })
  text: string;

  @Column()
  @ApiProperty({
    description: 'The date of the message',
    example: '2020-01-01T00:00:00.000Z',
  })
  @ManyToOne(type => User, user => user.messages)
  user: User;
}






