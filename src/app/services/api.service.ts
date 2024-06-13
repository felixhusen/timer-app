import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { ITimer } from './typings';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private readonly apiUrl = environment.apiUrl;
  constructor(private http: HttpClient) {}

  addTimer(duration: number) {
    return this.http.post<{
      success: boolean;
      data: ITimer;
    }>(this.apiUrl + '/timer/add', { duration });
  }

  startTimer(timerId: string) {
    return this.http.post<{
      success: boolean;
      data: { timerId: string };
    }>(this.apiUrl + '/timer/start', { timerId });
  }

  pauseTimer(timerId: string) {
    return this.http.post<{
      success: boolean;
      data: { timerId: string };
    }>(this.apiUrl + '/timer/pause', { timerId });
  }

  getTimers() {
    return this.http.get<{
      success: boolean;
      data: {
        timerDetails: ITimer[];
        pausedTimerCount: number;
        ongoingTimerCount: number;
      };
    }>(this.apiUrl + '/timer');
  }
}
