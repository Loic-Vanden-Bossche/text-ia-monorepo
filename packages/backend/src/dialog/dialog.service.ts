import { Injectable } from '@nestjs/common';
import { Dialog } from "./dialog.entity";
import DialogCreateDto from "./dialog.create.dto";
import DialogUpdateDto from "./dialog.update.dto";

@Injectable()
export class DialogService {

  findAll(): Promise<Dialog[]> {
    return Dialog.find();
  }

  findOne(id: string): Promise<Dialog> {
    return Dialog.findOne(id);
  }

  create(dialog: DialogCreateDto): Promise<Dialog> {
    return Dialog.create(dialog).save();
  }

  async update(id: string, dialog: DialogUpdateDto): Promise<Dialog> {
    const dialogToUpdate = await Dialog.findOne(id);
    dialogToUpdate.context = dialog.context;
    return await dialogToUpdate.save();
  }

  async delete(id: string): Promise<Dialog> {
    const dialogToDelete = await Dialog.findOne(id);
    return await dialogToDelete.remove();
  }
}
