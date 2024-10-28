import { Component } from '@angular/core';
import { GetTeacherService } from '../services/get-teacher.service';
import { RouterLink } from '@angular/router';
import { NgbRatingModule } from '@ng-bootstrap/ng-bootstrap';
import { RatingService } from '../services/rating.service';
import { TeacherCardComponent } from "./teacher-card/teacher-card.component";
import { NgxPaginationModule } from 'ngx-pagination';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';
@Component({
  selector: 'app-teacher',
  standalone: true,
  imports: [RouterLink, NgbRatingModule, TeacherCardComponent, MatPaginatorModule, NgxPaginationModule],
  templateUrl: './teacher.component.html',
  styleUrl: './teacher.component.css'
})
export class TeacherComponent {
  pageSize = 3;
  currentPage = 0;
  totalItems = 0;
  teachers: any;
  rating: any;
  ratingAverage: any;
  items: any[] = [];

  constructor(private teacher: GetTeacherService, private rateservice: RatingService) {
  }
  ngOnInit() {
    this.teacher.getAllTeachers().subscribe(data => {
      this.teachers = (data as any).data;
      this.totalItems = this.teachers.length;
      this.items = this.getData(this.currentPage, this.pageSize);

    });
  }
    getData(page: number, pageSize: number): any[] {
      const startIndex = page * pageSize;
      const endIndex = startIndex + pageSize;
      return this.teachers.slice(startIndex, endIndex);
    }
  pageChanged(event: PageEvent) {
    this.currentPage = event.pageIndex;
    this.pageSize = event.pageSize;
    this.items = this.getData(this.currentPage, this.pageSize);
  }
  }

