import { Component } from '@angular/core';
import { CardComponent } from "../../Shared/card/card.component";
import { CoursesService } from '../../services/courses.service';

@Component({
  selector: 'app-course-list',
  standalone: true,
  imports: [CardComponent],
  templateUrl: './course-list.component.html',
  styleUrl: './course-list.component.css'
})
export class CourseListComponent {
  courses:any;
  constructor(private courseService: CoursesService) {
  }
  ngOnInit() {
    this.courseService.getAllCourses().subscribe((data: any) => {
      this.courses = data;
      console.log(this.courses);
    });
  }
}
