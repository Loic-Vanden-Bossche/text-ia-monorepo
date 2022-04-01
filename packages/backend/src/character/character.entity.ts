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
    description: 'The image url of the character',
    example: 'https://example.com/image.png',
  })
  image: string;

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
    description: 'The hair length of the character',
    example: 'long',
  })
  hairLength: string;

  @Column()
  @ApiProperty({
    description: 'The skin color of the character',
    example: 'white',
  })
  color: string;

  @Column()
  @ApiProperty({
    description: 'The sex of the character',
    example: 'male',
  })
  sex: string;

  @OneToMany(type => Dialog, dialog => dialog.character)
  dialogs: Dialog[];
}



