import { Component, signal, ViewEncapsulation } from '@angular/core';
import { CardComponent } from "../../Shared/card/card.component";
import { CoursesService } from '../../services/courses.service';
import { CoursePlaylistService } from '../../services/course-playlist.service';
import { Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormControl, FormGroup, FormBuilder } from '@angular/forms';
import { CategoriesService } from '../../services/categories.service';
import { ToastrService } from 'ngx-toastr';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { NgxPaginationModule } from 'ngx-pagination';

@Component({
  selector: 'app-course-list',
  standalone: true,
  imports: [CardComponent, RouterLink, CommonModule, ReactiveFormsModule, MatPaginatorModule, NgxPaginationModule],
  templateUrl: './course-list.component.html',
  styleUrls: ['./course-list.component.css'],
   encapsulation: ViewEncapsulation.None
})
export class CourseListComponent {
  pageSize = 3;
  currentPage = 0;
  totalItems = 0;
  courses: any[] = [];
  items: any[] = [];
  searchControl: FormControl = new FormControl('');
  categories: any;
  categoryControl: FormControl = new FormControl('');
  category_id = signal("");

  constructor(
    private fb: FormBuilder,
    private playListService: CoursePlaylistService,
    private CoursesService: CoursesService,
    private router: Router,
    private category: CategoriesService,
    private toaster: ToastrService
  ) { }

  ngOnInit() {
    this.CoursesService.getAllCourses().subscribe((data: any) => {
      this.courses = data;
      this.totalItems = this.courses.length;
      this.items = this.getData(this.currentPage, this.pageSize);
      this.category.getAllCategories().subscribe((data: any) => {
        this.categories = data;
      });
    });
  }

  getData(page: number, pageSize: number): any[] {
    const startIndex = page * pageSize;
    const endIndex = startIndex + pageSize;
    return this.courses.slice(startIndex, endIndex);
  }

  searchCourses(keyword: string) {
    this.CoursesService.searchCourses(keyword).subscribe((data: any) => {
      this.courses = data;
      this.totalItems = this.courses.length;
      this.items = this.getData(this.currentPage, this.pageSize); // Reset items after search
    });
  }

  onCategoryChange(event: any) {
    const selectedCategoryId = event.target.value;
    if (selectedCategoryId === '') {
      this.CoursesService.getAllCourses().subscribe((data: any) => {
        this.courses = data;
        this.items = this.getData(this.currentPage, this.pageSize);
      });
      return;
    }
    this.category.searchCategory(selectedCategoryId).subscribe((data: any) => {
      this.courses = data;
      this.items = this.getData(this.currentPage, this.pageSize);
    });
  }

  pageChanged(event: PageEvent) {
    this.currentPage = event.pageIndex;
    this.pageSize = event.pageSize;
    this.items = this.getData(this.currentPage, this.pageSize);
  }
}
