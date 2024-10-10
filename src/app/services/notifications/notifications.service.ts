import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NotificationsService {
  url = 'http://127.0.0.1:8000/api/user-notifications';
  private notification = new BehaviorSubject<any>({});
  userNotifications = this.notification.asObservable();
  http = inject(HttpClient)
  constructor() { }
  getUserNotifications() {
    return this.http.get(this.url);
  }
}
