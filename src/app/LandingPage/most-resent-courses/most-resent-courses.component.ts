import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { CoursesService } from '../../services/courses.service';
import { GetTeacherService } from '../../services/get-teacher.service';
import { TruncatePipe } from '../../Pipes/truncate.pipe';

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
  truncate= new TruncatePipe();

  constructor(private course : CoursesService ,private teacherService:GetTeacherService ,private router : Router){
    this.course.getAllCourses().subscribe(data => {
      this.courses = data as any[];
      this.courses = this.courses.slice(1, 3);

      this.courses.forEach((course: any) => {
        this.teacherService.getTeacher(course.instructor_id).subscribe((teacherData: any) => {
          course.teacherName = teacherData.teacher.name;
          course.teacherImage = teacherData.teacher.image;
        });
      });
    });

  }


  ngOnInit(){}
}
