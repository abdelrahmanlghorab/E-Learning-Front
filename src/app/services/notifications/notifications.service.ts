import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NotificationsService {
  url = 'http://127.0.0.1:8000/api/user-notifications';
  Url = 'http://127.0.0.1:8000/api/read-notifications';
  private notification = new BehaviorSubject<any>({});
  userNotifications = this.notification.asObservable();
  http = inject(HttpClient)
  constructor() { }
  getUserNotifications() {
    return this.http.get(this.url);
  }
  
  HttpHeaders = new HttpHeaders().set('Content-Type', 'application/json');
  markNotificationAsRead(id: any) {
    
    return this.http.post(this.Url, id, { headers:this.HttpHeaders });
  }
}
