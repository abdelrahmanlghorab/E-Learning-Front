import { Component } from '@angular/core';
import { UserService } from '../../../services/user.service';
import { Router, RouterLink } from '@angular/router';
import { PaymentService } from '../../../services/payment.service';
import { GetTeacherService } from '../../../services/get-teacher.service';

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
  user_teacher:any;
  user_data=JSON.parse(localStorage.getItem('data')!)
  constructor(private userService: UserService,private router: Router,private paymentService: PaymentService,private getAllTeachers:GetTeacherService) {
    this.user = {};
  }
  ngOnInit(): void {
    this.userService.getUser(Number(this.user_data.id)).subscribe(
      (data: any) => {
        console.log(data);
        this.user = data.data;
        // console.log(this.user);
      }
    );
    this.paymentService.getPayment().subscribe(
      (data: any) => {
        console.log(data);
        this.user_courses = data;
        console.log(this.user_courses);
      }
    );
    this.getAllTeachers.getAllTeachers().subscribe(
      (data: any) => {
        console.log(data);
        this.user_teacher = data.data;
        console.log(this.user_teacher);
      }
    );
  }
}




