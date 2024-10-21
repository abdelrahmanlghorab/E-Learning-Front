import { Component } from '@angular/core';
import { CardComponent } from "../../Shared/card/card.component";
import { CoursesService } from '../../services/courses.service';
import { CoursePlaylistService } from '../../services/course-playlist.service';
import { Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormControl } from '@angular/forms';

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

  constructor(private playListService: CoursePlaylistService, private CoursesService: CoursesService,private router: Router) { }

  ngOnInit() {
    this.CoursesService.getAllCourses().subscribe((data: any) => {
      this.courses = data;
    });
  }

  searchCourses(keyword: string) { 
    // this.router.navigate(['/searchresult'], { queryParams: { keyword } });
    this.CoursesService.searchCourses(keyword).subscribe((data: any) => {
      this.courses = data;
    });
  }

}
