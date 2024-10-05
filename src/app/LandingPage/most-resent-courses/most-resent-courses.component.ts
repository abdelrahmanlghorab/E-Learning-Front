import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CoursesService } from '../../services/courses.service';

@Component({
  selector: 'app-most-resent-courses',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './most-resent-courses.component.html',
  styleUrl: './most-resent-courses.component.css'
})
export class MostResentCoursesComponent {
  courses :any;

  constructor(private course : CoursesService){
    this.course.getAllCourses().subscribe(data => {
      this.courses = data;
      console.log(this.courses);
    }); 
  }
}
