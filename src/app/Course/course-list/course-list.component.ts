import { Component, signal } from '@angular/core';
import { CardComponent } from "../../Shared/card/card.component";
import { CoursesService } from '../../services/courses.service';
import { CoursePlaylistService } from '../../services/course-playlist.service';
import { Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormControl, FormGroup, FormBuilder } from '@angular/forms';
import { CategoriesService } from '../../services/categories.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-course-list',
  standalone: true,
  imports: [CardComponent, RouterLink, CommonModule, ReactiveFormsModule],
  templateUrl: './course-list.component.html',
  styleUrls: ['./course-list.component.css']
})
export class CourseListComponent {
  courses: any[] = [];
  searchControl: FormControl = new FormControl('');
  showSearchResults = false;
  categories:any;
  searchcategory:any;
  categoryControl: FormControl = new FormControl('');
  category_id = signal("");



  constructor
  (private fb: FormBuilder,private playListService: CoursePlaylistService, private CoursesService: CoursesService,private router: Router, private category:CategoriesService,private toaster :ToastrService) { }
  ngOnInit() {
    this.CoursesService.getAllCourses().subscribe((data: any) => {
      this.courses = data;
      this.category.getAllCategories().subscribe((data: any) => {
        this.categories = data;
        console.log(this.categories);
      });
    });
  }

  searchCourses(keyword: string) {
    this.CoursesService.searchCourses(keyword).subscribe((data: any) => {
      this.courses = data;
    });
  }

  onCategoryChange(event: any) {
    const selectedCategoryId = event.target.value;
    console.log('Selected Category ID:', selectedCategoryId);
    }

}
