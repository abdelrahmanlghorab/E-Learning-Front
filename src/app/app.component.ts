import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SignInComponent } from "./Auth/sign-in/sign-in.component";
import { StudentSignUPComponent } from "./Auth/Registeration/student-sign-up/student-sign-up.component";
import { TeacherSignUPComponent } from "./Auth/Registeration/teacher-sign-up/teacher-sign-up.component";
import { ForgetPasswordComponent } from "./Auth/forget-password/forget-password.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, SignInComponent, StudentSignUPComponent, TeacherSignUPComponent, ForgetPasswordComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'ana-kafou';
}
