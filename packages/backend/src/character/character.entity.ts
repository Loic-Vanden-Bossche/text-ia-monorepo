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
    description: 'The firstname of the character',
    example: 'John',
  })
  firstName: string;

  @Column()
  @ApiProperty({
    description: 'The lastname of the character',
    example: 'Doe',
  })
  lastname: string;

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

  @Column()
  @ApiProperty({
    description: 'The age of the character',
    example: 20,
  })
  age: number;

  @Column()
  @ApiProperty({
    description: 'The eye color of the character',
    example: 'blue',
  })
  eyeColor: string;

  @Column()
  @ApiProperty({
    description: 'The hair color of the character',
    example: 'blond',
  })
  hairColor: string;

  @Column()
  @ApiProperty({
    description: 'The hair style of the character',
    example: 'long',
  })
  hairStyle: string;

  @Column()
  @ApiProperty({
    description: 'The nationality of the character',
    example: 'white',
  })
  nationality: string;

  @Column()
  @ApiProperty({
    description: 'The sex of the character',
    example: 'male',
  })
  sex: string;

  @Column("bytea", { nullable: true })
  @ApiProperty({
    description: 'The base64 image',
    example: '/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAYGBgYHBgcICAcKC....',
  })
  image?: Buffer;

  @OneToMany(type => Dialog, dialog => dialog.character)
  dialogs: Dialog[];
}



