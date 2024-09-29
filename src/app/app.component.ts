import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SignInComponent } from "./Auth/sign-in/sign-in.component";
import { StudentSignUPComponent } from "./Auth/Registeration/student-sign-up/student-sign-up.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, SignInComponent, StudentSignUPComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'ana-kafou';
}
