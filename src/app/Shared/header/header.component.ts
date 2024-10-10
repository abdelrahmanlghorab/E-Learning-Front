import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../services/Auth/auth.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  data: any;
  name!: string;
  image!: string;
  role_id!: any;
  id!: any;
  isloggedIn: boolean = false;

  ngOnInit() {
    this.data = localStorage.getItem('data');
    if (this.data) {
      this.data = JSON.parse(this.data);
      this.name = this.data.name;
      this.image = this.data.image;
      this.role_id = this.data.role_id;
      this.id = this.data.id;
    }

    // this.data = localStorage.getItem('data');

    // this.authservices.response.subscribe(res=>{
    //   if(res){
    // this.data=res.data;
    //   }


    // })




    ;

    this.authservices.isLoggedIn$.subscribe((isLoggedIn) => {
      this.isloggedIn = isLoggedIn;

      this.data = JSON.parse(localStorage.getItem('data')!);

      if (this.data) {
        this.data = this.data;
        this.name = this.data.name;
        this.id= this.data.id;
        
        this.image = this.data.image;
        this.role_id = this.data.role_id;
      }
      // login = localStorage.getItem('Token');
      // userData = localStorage.getItem('data');

    });
  }
  toggleTheme() {
    const body = document.body;
    const themeIcon = document.getElementById('theme-icon');

    body.classList.toggle('dark-mode');

    if (body.classList.contains('dark-mode')) {
      themeIcon?.classList.replace('fa-sun', 'fa-moon');
    } else {
      themeIcon?.classList.replace('fa-moon', 'fa-sun');
    }
  }
  constructor(private router: Router, private authservices: AuthService) {
  }




  onLogout() {
    localStorage.removeItem('Token');
    localStorage.removeItem('data');
    localStorage.removeItem('notifications');

    this.authservices.setLoggedIn(false);
    this.router.navigateByUrl("signin");
  }


}