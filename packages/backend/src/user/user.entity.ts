import { BaseEntity, Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { ApiProperty } from '@nestjs/swagger';
import { Dialog } from "../dialog/dialog.entity";

@Entity('users')
export class User extends BaseEntity {

  @ApiProperty({
    description: 'The unique identifier of the user',
    example: '123e4567-e89b-12d3-a456-426655440000',
  })
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @ApiProperty({
    description: 'The first name of the user',
    example: 'John',
  })
  @Column()
  name: string;

  @ApiProperty({
    description: 'The last name of the user',
    example: 'Doe',
  })
  @Column()
  email: string;

  @ApiProperty({
    description: 'The password of the user',
    example: '123456',
  })
  @Column()
  password: string;

  @ApiProperty({
    description: 'The created date of the user',
    example: '2020-01-01T00:00:00.000Z',
  })
  @Column('timestamp')
  created: Date;

  @ApiProperty({
    description: 'The updated date of the user',
    example: '2020-01-01T00:00:00.000Z',
  })
  @Column('timestamp')
  updated: Date;

  @OneToMany(type => Dialog, dialog => dialog.user)
  dialogs: Dialog[];
}






