import {BaseEntity, Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn} from "typeorm";
import { User } from "../user/user.entity";
import { Message } from "../message/message.entity";
import {ApiProperty} from "@nestjs/swagger";

@Entity('dialogs')
export class Dialog extends BaseEntity {

  @PrimaryGeneratedColumn('uuid')
  @ApiProperty({
    description: 'The id of the dialog',
    example: '5e9f8f8f-8f8f-8f8f-8f8f-8f8f8f8f8f8f',
  })
  id: string;

  @Column({default: true})
  @ApiProperty({
    description: 'The name of the dialog',
    example: 'My dialog',
  })
  isArchived: boolean = false;

  @Column()
  @ApiProperty({
    description: 'The context description of the dialog',
    example: 'This is a discussion between two users',
  })
  context: string;

  @ApiProperty({
    description: 'The id of the user who created the dialog',
    example: '5e9f8f8f-8f8f-8f8f-8f8f-8f8f8f8f8f8f',
  })
  @ManyToOne(type => User, user => user.dialogs)
  user: User;

  @OneToMany(type => Message, message => message.dialog)
  messages: Message[];
}






