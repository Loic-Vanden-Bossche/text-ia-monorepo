import {Injectable} from '@nestjs/common';
import {Context} from "./context.entity";
import ContextCreateDto from "./context.create.dto";

@Injectable()
export class ContextService {
  constructor() {}

  getGroupedContexts(): Promise<{[type: string]: string}> {
    return Context.find().then(contexts => {
      return contexts.reduce((groupedContexts, context) => {
        if (!groupedContexts[context.type]) {
          groupedContexts[context.type] = [];
        }
        groupedContexts[context.type] = [...groupedContexts[context.type], context];
        return groupedContexts;
      }, {});
    });
  }

  createContext(context: ContextCreateDto): Promise<Context> {
    return Context.create(context).save();
  }
}
