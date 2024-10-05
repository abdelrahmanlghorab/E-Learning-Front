import { Component } from '@angular/core';
import { CardComponent } from "../../Shared/card/card.component";
import { CoursesService } from '../../services/courses.service';
import { CoursePlaylistService } from '../../services/course-playlist.service';

@Component({
  selector: 'app-course-list',
  standalone: true,
  imports: [CardComponent],
  templateUrl: './course-list.component.html',
  styleUrl: './course-list.component.css'
})
export class CourseListComponent {
  courses:any;
  constructor(private playListService: CoursePlaylistService, private CoursesService: CoursesService) {
  }
  ngOnInit() {
    this.CoursesService.getAllCourses().subscribe((data: any) => {
      this.courses = data;
      console.log(this.courses, "coureserved");
    });
  }
}
