import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { CoursesService } from '../../services/courses.service';
import { GetTeacherService } from '../../services/get-teacher.service';

@Component({
  selector: 'app-most-resent-courses',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './most-resent-courses.component.html',
  styleUrl: './most-resent-courses.component.css'
})
export class MostResentCoursesComponent {
  courses :any;
  teacher!: any;
  teacherName!: any;
  teacherImage: any;
  teach:any;
  constructor(private course : CoursesService ,private teacherService:GetTeacherService ,private router : Router){
    this.course.getAllCourses().subscribe(data => {
      this.courses = data as any[];
      this.courses = this.courses.slice(0, 3);
    
      this.courses.forEach((course: any) => {
        this.teacherService.getTeacher(course.instructor_id).subscribe((teacherData: any) => {
          course.teacherName = teacherData.data[0].name;
          course.teacherImage = teacherData.data[0].image;
        });
      });
    });
    
  }


  ngOnInit(){
   
        }
}
