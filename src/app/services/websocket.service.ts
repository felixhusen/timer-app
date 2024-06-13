import { Injectable } from '@angular/core';
import { Socket } from 'ngx-socket-io';
import { environment } from '../../environments/environment';
import { NGXLogger } from 'ngx-logger';
import { ITimer } from './typings';

export const WS_ENDPOINT = environment.wsUrl;

@Injectable({
  providedIn: 'root',
})
export class WebsocketService {
  private webSocket: Socket;
  constructor(private logger: NGXLogger) {
    this.webSocket = new Socket({
      url: WS_ENDPOINT,
      options: {},
    });
  }

  timerEvent() {
    return this.webSocket.fromEvent<ITimer>('timer');
  }

  // this method is used to end web socket connection
  disconnect() {
    this.webSocket.disconnect();
  }
}
