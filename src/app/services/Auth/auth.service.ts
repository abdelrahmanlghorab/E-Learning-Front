import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private loggedIn = new BehaviorSubject<boolean>(false);
  isLoggedIn$ = this.loggedIn.asObservable();
  constructor(private http:HttpClient) {}
    onLogin(obj:any){
      return this.http.post("http://127.0.0.1:8000/api/login",obj)
    }
    onRegister(obj:any){
      return this.http.post("http://127.0.0.1:8000/api/register",obj)
    }
    setLoggedIn(value: boolean) {
      this.loggedIn.next(value);
    }
   
}
