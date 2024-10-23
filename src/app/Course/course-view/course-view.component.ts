import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CoursesService } from '../../services/courses.service';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-course-view',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './course-view.component.html',
  styleUrl: './course-view.component.css'
})
export class CourseViewComponent {
  courses: any;
constructor(private courseService: CoursesService) {}
ngOnInit(): void {
  this.courseService.getAllCourses().subscribe(
    (response) => {
      console.log(response , "from course");

      this.courses = response;
    },
    (error) => {
      console.error('Error fetching courses', error);
    }
  );
}
removeCourse(id: number) {
  Swal.fire({
    title: 'Are you sure?',
    text: 'This action cannot be undone!',
    icon: 'warning',
    showCancelButton: true,
    confirmButtonText: 'Yes, proceed!',
    cancelButtonText: 'Cancel',
  }).then((result)=>{
    if (result.isConfirmed) {
      Swal.fire('Confirmed!', 'You have confirmed the action.', 'success');
      this.courseService.deleteCourse(id).subscribe(
        (response) => {
          
          this.courses = this.courses.filter((course: any) => course.id !== id);
        },
        (error) => {
          alert('Error deleting course');
        }
      );
    } else if (result.isDismissed) {
      Swal.fire('Cancelled', 'The action was canceled.', 'error');
      return ;
    }
  })
  
}
}