import { Component } from '@angular/core';
import { UserService } from '../../../services/user.service';
import { Router, RouterLink } from '@angular/router';
import { CoursesService } from '../../../services/courses.service';

@Component({
  selector: 'app-profile-view',
  standalone: true,
  imports: [RouterLink],
  providers: [UserService],
  templateUrl: './student-profile-view.component.html',
  styleUrls: ['./student-profile-view.component.css']
})
export class ProfileViewComponent {
  user: any;
  user_courses:any;
  user_data=JSON.parse(localStorage.getItem('data')!)
  constructor(private coursesService: CoursesService,private userService: UserService,private router: Router) {
  }
  ngOnInit(): void {
    this.userService.getUser(Number(this.user_data.id)).subscribe(
      (data: any) => {
        console.log(data);
        this.user = data.data;
        // console.log(this.user);
      }
    );
    this.coursesService.getCourse(Number(this.user_data.id)).subscribe(
      (data: any) => {
        console.log(data);
        this.user_courses = data.data;
      }
    );
  }
}




