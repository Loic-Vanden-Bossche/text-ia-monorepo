import {BaseEntity, Column, Entity, OneToMany, PrimaryGeneratedColumn} from "typeorm";
import {ApiProperty} from "@nestjs/swagger";
import {Dialog} from "../dialog/dialog.entity";

@Entity('contexts')
export class Context extends BaseEntity {

  @PrimaryGeneratedColumn('uuid')
  @ApiProperty({
    description: 'The unique identifier of the context.',
    example: '5e8f8f8f-8f8f-8f8f-8f8f-8f8f8f8f8f8f',
  })
  id: string;

  @Column()
  @ApiProperty({
    description: 'The name of the context.',
    example: 'classic dialog',
  })
  name: string;

  @Column()
  @ApiProperty({
    description: 'The description of the context.',
    example: 'The description of the context.',
  })
  description: string;

  @Column()
  @ApiProperty({
    description: 'The internal description of the context.',
    example: 'The internal description of the context.',
  })
  internalDescription: string;

  @Column()
  @ApiProperty({
    description: 'The type of the context.',
    example: 'normal',
  })
  type: string;

  @OneToMany(type => Dialog, dialog => dialog.context)
  dialogs: Dialog[];
}



