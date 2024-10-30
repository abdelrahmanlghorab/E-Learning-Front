import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CoursesService } from '../../services/courses.service';
import { CardComponent } from "../../Shared/card/card.component";
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-search-result',
  standalone: true,
  imports: [CardComponent,CommonModule],
  templateUrl: './search-result.component.html',
  styleUrl: './search-result.component.css'
})
export class SearchResultComponent {
  results: any[] = [];
  keyword: string = '';
  constructor(private router: Router, private courseservises: CoursesService) { }
  ngOnInit() {
    console.log('SearchResultComponent Initialized');
    const queryParams = this.router.parseUrl(this.router.url).queryParams;
    this.keyword = queryParams['keyword'] || '';

    if (queryParams && queryParams['keyword']) {
      const keyword = queryParams['keyword'];
      console.log('Calling searchCourses() with keyword:', keyword);

      this.courseservises.searchCourses(keyword).subscribe((data: any) => {
        this.results = data;
        console.log('Search Results:', this.results);
      });
    }
  }

}
