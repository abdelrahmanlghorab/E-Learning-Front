import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SignInComponent } from "./Auth/sign-in/sign-in.component";
import { StudentSignUPComponent } from "./Auth/Registeration/student-sign-up/student-sign-up.component";
import { TeacherSignUPComponent } from "./Auth/Registeration/teacher-sign-up/teacher-sign-up.component";
import { HeroSectionComponent } from './LandingPage/hero-section/hero-section.component';
import { OurTeacherComponent } from './LandingPage/our-teacher/our-teacher.component';
import { AboutUsComponent } from './LandingPage/about-us/about-us.component';
import { MostResentCoursesComponent } from './LandingPage/most-resent-courses/most-resent-courses.component';
import { HeaderComponent } from "./Shared/header/header.component";
import { FooterComponent } from "./Shared/footer/footer.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, SignInComponent, StudentSignUPComponent, TeacherSignUPComponent],

  imports: [RouterOutlet, OurTeacherComponent, AboutUsComponent, MostResentCoursesComponent, HeroSectionComponent, HeaderComponent, FooterComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'ana-kafou';
}
