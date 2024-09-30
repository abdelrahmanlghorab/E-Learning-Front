import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
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
  
}
