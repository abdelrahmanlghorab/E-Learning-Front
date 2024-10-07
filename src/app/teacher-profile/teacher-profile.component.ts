import { Component } from '@angular/core';
import { GetTeacherService } from '../services/get-teacher.service';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-teacher-profile',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './teacher-profile.component.html',
  styleUrl: './teacher-profile.component.css'
})
export class TeacherProfileComponent {
  id:any;
  teacher: any;
constructor( private getteacher :GetTeacherService , public router: Router, private activatedRoute: ActivatedRoute){
  this.id = this.activatedRoute.snapshot.params['id'];
  this.getteacher.getTeacher(this.id).subscribe(data => {
    this.teacher = (data as any).teacher[0];
    console.log((data as any).teacher[0]);
  });
}
}
