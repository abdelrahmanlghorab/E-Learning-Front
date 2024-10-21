import { Component } from '@angular/core';
import { CardComponent } from "../../Shared/card/card.component";
import { CoursesService } from '../../services/courses.service';
import { CoursePlaylistService } from '../../services/course-playlist.service';
import { Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormControl } from '@angular/forms';
import { CategoriesService } from '../../services/categories.service';

@Component({
  selector: 'app-course-list',
  standalone: true,
  imports: [CardComponent, RouterLink, CommonModule, ReactiveFormsModule],
  templateUrl: './course-list.component.html',
  styleUrls: ['./course-list.component.css'] 
})
export class CourseListComponent {
  courses: any[] = []; 
  categories: any;
  searchControl: FormControl = new FormControl(''); 
  showSearchResults = false;

  constructor(private playListService: CoursePlaylistService,
     private CoursesService: CoursesService,
     private router: Router,
     private category :CategoriesService
    ) { }

  ngOnInit() {
    this.CoursesService.getAllCourses().subscribe((data: any) => {
      this.courses = data;
    });
    this.category.getAllCategories().subscribe(categoryData => {
      this.categories = categoryData;
      // this.categories = this.categories.data;
    }); 
  }

  searchCourses(keyword: string) { 
    // this.CoursesService.searchCourses(keyword).subscribe((data: any) => {
    //   this.courses = data;
    //   this.toggleSearchResults();
    // });
    console.log(keyword);
    
    // this.router.navigate(['/searchresult'], { queryParams: { keyword } });
  }
  toggleSearchResults() {
    this.showSearchResults = !this.showSearchResults;
  }

}
