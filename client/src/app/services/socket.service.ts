// src/app/services/socket.service.ts
import { Injectable } from '@angular/core';
import { io, Socket } from 'socket.io-client';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SocketService {
  private socket: Socket;

  constructor() {
    this.socket = io('https://db14-175-141-68-26.ngrok-free.app', {
        extraHeaders: {
            'ngrok-skip-browser-warning':  '69420'
        }
    });
  }

  listenNewMessages = () => new Observable<void>((subscriber) => {
    this.socket.on('newMessage', () => subscriber.next());
  });

  disconnect = () => this.socket && this.socket.disconnect();
}
