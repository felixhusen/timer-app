import { Injectable } from '@angular/core';
import { Socket } from 'ngx-socket-io';
import { environment } from '../../environments/environment';
import { ITimer } from './typings';

export const WS_ENDPOINT = environment.wsUrl;

@Injectable({
  providedIn: 'root',
})
export class WebsocketService {
  private webSocket: Socket;
  constructor() {
    this.webSocket = new Socket({
      url: WS_ENDPOINT,
      options: {},
    });
  }

  timerEvent() {
    return this.webSocket.fromEvent<ITimer>('timer');
  }

  disconnect() {
    this.webSocket.disconnect();
  }
}
