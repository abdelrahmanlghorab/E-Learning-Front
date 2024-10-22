import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-hero-section',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './hero-section.component.html',
  styleUrl: './hero-section.component.css'
})
export class HeroSectionComponent {
  data: any;
  isLoggedIn: boolean=false;

  ngOnInit() {
    this.data = localStorage.getItem('Token');
    if (this.data){
      this.isLoggedIn = true;
    }
  }
}
