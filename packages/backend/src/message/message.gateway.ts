import {WebSocketGateway, WebSocketServer} from "@nestjs/websockets";
import {Server} from "net";

@WebSocketGateway(8090, { cors: { origin: 'http://localhost:4200' } })
export class MessageGateway {
  @WebSocketServer()
  server: Server;

  emit(event: string, data: any) {
    this.server.emit(event, data);
  }
}
