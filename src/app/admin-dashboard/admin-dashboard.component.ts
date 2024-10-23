import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { PaymentService } from '../services/payment.service';
import { GetTeacherService } from '../services/get-teacher.service';
import { CoursesService } from '../services/courses.service';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-admin-dashboard',
  standalone: true,
  imports: [CommonModule, RouterLink ,MatPaginatorModule,MatTableModule],
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.css'],
})
export class AdminDashboardComponent implements OnInit {
  isCollapsed = false;
  data: any;
  courseCount = 0;
  courses: any[] = [];
  name!: string;
  userCount: any;  
  users:any;
  image!: string;
  role_id!: any;
  paymentCount!:any;
  teacherCount!:any;
  id!: any;
  payments: any;
  dataSource!: MatTableDataSource<any>; 
  displayedColumns: string[] = ['id', 'amount', 'date', 'status']; 
  @ViewChild(MatPaginator) paginator!: MatPaginator; 
  
  constructor(private paymentService: PaymentService,
    private teacher : GetTeacherService,
    private CoursesService: CoursesService,
    private userService: UserService,
  ) {}

  trackByPaymentId(index: number, payment: any): number {
    return payment.id;
  }
  ngOnInit() {
    this.data = localStorage.getItem('data');
    if (this.data) {
      this.data = JSON.parse(this.data);
      this.name = this.data.name;
      this.image = this.data.image;
      this.role_id = this.data.role_id;
      this.id = this.data.id;
      console.log(this.role_id);
      
    }
    this.paymentService.getPayments().subscribe(
      (response: any) => {
        this.payments = response.payments;
        this.paymentCount =response.payments.length;
        // console.log(this.paymentCount);
        this.dataSource = new MatTableDataSource(this.payments); 
        this.dataSource.paginator = this.paginator; 
      },
      (error: any) => {
        console.error('Error fetching payments', error);
      }
    );
    this.teacher.getAllTeachers().subscribe(data => {
      this.teacherCount = (data as any).data.length; 
    }); 

    this.CoursesService.getAllCourses().subscribe((data: any) => {
      this.courses = data;
      this.courseCount = this.courses.length;
    }); 
    this.userService.getAllStudent().subscribe(
      (response) => {
        this.users = response;
        this.userCount = this.users.length;
        // console.log(this.users.length,"users");
      },
      (error) => {
        console.error('Error fetching Users', error);
      }
    );



  }

  toggleSidebar() {
    this.isCollapsed = !this.isCollapsed;
  }
}
