import {WebSocketGateway, WebSocketServer} from "@nestjs/websockets";
import {Server} from "net";
import whitelist from "../../lib/whitelist";

@WebSocketGateway({ cors: { origin: whitelist } })
export class MessageGateway {
  @WebSocketServer()
  server: Server;

  emit(event: string, data: any) {
    this.server.emit(event, data);
  }
}
