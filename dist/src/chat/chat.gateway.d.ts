import { OnGatewayInit } from '@nestjs/websockets';
import { Socket, Server } from 'socket.io';
export declare class ChatGateway implements OnGatewayInit {
    wss: Server;
    private logger;
    afterInit(server: any): void;
    handleMessage(client: Socket, message: {
        sender: string;
        room: string;
        message: string;
    }): void;
    handleRoomJoin(client: Socket, room: string): void;
    handleRoomLeave(client: Socket, room: string): void;
}
