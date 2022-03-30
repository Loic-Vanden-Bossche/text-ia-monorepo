import {BaseEntity, Column, Entity, OneToMany, PrimaryGeneratedColumn} from "typeorm";
import {ApiProperty} from "@nestjs/swagger";
import {Dialog} from "../dialog/dialog.entity";

@Entity('characters')
export class Character extends BaseEntity {

  @PrimaryGeneratedColumn('uuid')
  @ApiProperty({
    description: 'The unique identifier of the character',
    example: '5e8f8f8f-8f8f-8f8f-8f8f-8f8f8f8f8f8f',
  })
  id: string;

  @Column()
  @ApiProperty({
    description: 'The name of the character',
    example: 'John Doe',
  })
  name: string;

  @Column()
  @ApiProperty({
    description: 'The internal description of the character',
    example: 'John Doe is a hero',
  })
  internalDescription: string;

  @Column()
  @ApiProperty({
    description: 'The description of the character',
    example: 'John Doe is a hero',
  })
  description: string;

  @OneToMany(type => Dialog, dialog => dialog.character)
  dialogs: Dialog[];
}



