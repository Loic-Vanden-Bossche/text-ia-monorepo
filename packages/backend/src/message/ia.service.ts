import {Injectable} from "@nestjs/common";
import {Dialog} from "../dialog/dialog.entity";
import {Message} from "./message.entity";
import {MessageGateway} from "./message.gateway";
import {MessageService} from "./message.service";
import {DialogService} from "../dialog/dialog.service";
import {HttpService} from "@nestjs/axios";
import {Character} from "../character/character.entity";

export interface ApiResponse {
  id: string,
  model: string,
  created: number,
  choices: Array<{
    completion_id: string,
    text: string,
    index: number,
    num_tokens_completion: number,
    num_tokens_prompt: number,
    toxic: boolean
  }>
}

@Injectable()
export class IAService {

  constructor(
    private messageGateway: MessageGateway,
    private messageService: MessageService,
    private dialogService: DialogService,
    private http: HttpService,
  ) {}

  async triggerMessageGeneration(dialog: Dialog) : Promise<void> {
    this.generateMessages(dialog).then(messages => {
      messages.forEach(message => {
        this.messageGateway.emit('message', message);
      });
    });
  }

  async generateTextMessages(dialog: Dialog) : Promise<string[]> {

    const messages = await this.dialogService.findMessages(dialog.id);

    let textMessages = null;

    while (!textMessages) {
      console.log(this.buildQuery(dialog, messages).length)
      textMessages = this.parseResponse(await this.getCompletion(this.buildQuery(dialog, messages)), dialog.character);
    }

    return textMessages;
  }

  getCompletion(prompt: string) : Promise<string> {
    const formatResponse = (data: ApiResponse) => data.choices[0].text;
    return this.http.post<ApiResponse>('https://api.cedille.ai/v1/engines/fr-boris/completions', {
        prompt,
        max_length: 70,
        temperature: 0.7,
        top_p: 1,
        n: 1,
        repetition_penalty: 1.1,
        stop_sequences: []
      },
      {
        headers: {
          'Content-Type': 'application/json',
          'authorization': `Bearer ${process.env.CEDILLE_API_KEY}`
        }
      }).toPromise().then(response => formatResponse(response.data));
  }

  parseResponse(rawRes: string, targetCharacter: Character): string[] | null {
    console.log(' ... parsing', rawRes)
    const messages: string[] = [];
    for (const [i, line] of rawRes.split("\\n").entries()) {
      console.log(line);
      if(messages.length === 0 && line.trim().length !== 0){
        messages.push(line.trim());
      } else {
        if(/\[[A-Za-z]+](:.*| : .*)/gm.exec(line)) {
          const [personName, text] = line.split(":");
          const person = /\[(.*?)]/gm.exec(personName)![1].toLowerCase();
          if (person !== targetCharacter.firstName.toLowerCase()) break;
          if (!person || !text) break;
          messages.push(text.trim());
        } else if (messages.length > 0) {
          break;
        }
      }
    }
    return messages.length ? messages : null;
  }

  buildQuery(dialog: Dialog, messages: Message[]): string {
    return `${dialog.context}\\n${dialog.character.internalDescription}\\n\\n`
      .concat(messages
        .sort((a, b) => a.createdAt.getTime() - b.createdAt.getTime())
        .map(m => `[${m.iaGenerated ? dialog.character.firstName : dialog.user.name}]:  ${m.text}`)
        .join('\\n')
        .concat(`\\n[${dialog.character.firstName}]: `)
      );
  }

  async generateMessages(dialog: Dialog): Promise<Message[]> {

    const textMessages = await this.generateTextMessages(dialog);

    return Promise.all(textMessages.map(text => this.messageService.create({
        dialogId: dialog.id,
        text,
      },
      dialog,
      true
    )));
  }
}
