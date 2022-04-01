import {BaseEntity, Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn} from "typeorm";
import { User } from "../user/user.entity";
import { Message } from "../message/message.entity";
import {ApiProperty} from "@nestjs/swagger";
import {Character} from "../character/character.entity";
import {Context} from "../context/context.entity";

@Entity('dialogs')
export class Dialog extends BaseEntity {

  @PrimaryGeneratedColumn('uuid')
  @ApiProperty({
    description: 'The id of the dialog',
    example: '5e9f8f8f-8f8f-8f8f-8f8f-8f8f8f8f8f8f',
  })
  id: string;

  @ManyToOne(type => Context, context => context.dialogs)
  context: Context;

  @ManyToOne(type => User, user => user.dialogs)
  user: User;

  @ManyToOne(type => Character, character => character.dialogs)
  character: Character;

  @OneToMany(type => Message, message => message.dialog)
  messages: Message[];
}






