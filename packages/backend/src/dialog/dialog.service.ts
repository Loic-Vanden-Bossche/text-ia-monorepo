import {BadRequestException, Injectable} from '@nestjs/common';
import { Dialog } from "./dialog.entity";
import DialogCreateDto from "./dialog.create.dto";
import DialogUpdateDto from "./dialog.update.dto";
import {UserService} from "../user/user.service";
import {Message} from "../message/message.entity";
import {Character} from "../character/character.entity";
import {DeleteResult} from "typeorm";

@Injectable()
export class DialogService {

  constructor(private userService: UserService) { }

  findAll(): Promise<Dialog[]> {
    return Dialog.find({ relations: ['user', 'character'] });
  }

  findOne(id: string): Promise<Dialog> {
    return Dialog.findOne({
      where: { id },
      relations: ['user', 'character'],
    });
  }

  findMessages(id: string): Promise<Message[]> {
    return Dialog.findOne({
      where: {
        id: id
      },
      relations: ['messages']
    }).then(dialog => dialog.messages);
  }

  async create(dialog: DialogCreateDto): Promise<Dialog> {

    const user = await this.userService.findOne(dialog.userId);
    const character = await Character.findOne(dialog.characterId);

    if (!user) {
      throw new BadRequestException('User not found');
    }

    return Dialog.create({ ...dialog, isArchived: false, user, character }).save();
  }

  async update(id: string, dialog: DialogUpdateDto): Promise<Dialog> {
    const dialogToUpdate = await Dialog.findOne(id);
    dialogToUpdate.context = dialog.context;
    return await dialogToUpdate.save();
  }

  async purge(): Promise<DeleteResult> {
    return Character.delete(await Character.createQueryBuilder('character')
      .leftJoin(Dialog, 'd', '"d"."characterId" = "character"."id"')
      .where('"d"."id" is null').getMany().then(characters => characters.map(character => character.id)));
  }

  async delete(id: string): Promise<Dialog> {
    const dialogToDelete = await Dialog.findOne(id);
    const remove = await dialogToDelete.remove();
    await this.purge();
    return remove;
  }
}
