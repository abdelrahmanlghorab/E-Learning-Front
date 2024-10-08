import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.css'
})
export class AdminComponent {
  constructor(private router: Router) {
    if (!this.login) {
      this.router.navigateByUrl("signin");
    }
  }
  
  login = localStorage.getItem('Token');
  userData = localStorage.getItem('data');


  onLogout() {
    localStorage.removeItem('Token');
    localStorage.removeItem('data');
    this.router.navigateByUrl("signin");
  }
}
