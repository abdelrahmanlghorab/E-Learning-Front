import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { OurTeacherComponent } from './LandingPage/our-teacher/our-teacher.component';
import { AboutUsComponent } from './LandingPage/about-us/about-us.component';
import { MostResentCoursesComponent } from './LandingPage/most-resent-courses/most-resent-courses.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet ,OurTeacherComponent , AboutUsComponent ,MostResentCoursesComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'ana-kafou';
}
