import { Server, Socket } from 'socket.io';
export declare class WebsocketGateway {
    server: Server;
    handleMessage(client: Socket, payload: any): void;
    handleConnection(client: Socket): void;
    handleDisconnect(client: Socket): void;
}
