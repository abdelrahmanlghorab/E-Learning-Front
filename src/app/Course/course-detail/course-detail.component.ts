import { Component } from '@angular/core';
import { CoursesService } from '../../services/courses.service';
import { ActivatedRoute, ActivatedRouteSnapshot, Router } from '@angular/router';
import { CoursePlaylistService } from '../../services/course-playlist.service';

@Component({
  selector: 'app-course-detail',
  standalone: true,
  imports: [],
  templateUrl: './course-detail.component.html',
  styleUrl: './course-detail.component.css'
})
export class CourseDetailComponent {
  course: any;
  id:any;

  constructor(private playListService: CoursePlaylistService, public router: Router, private activatedRoute: ActivatedRoute) {
  }
  ngOnInit() {
    this.id = this.activatedRoute.snapshot.params['id'];
    this.playListService.getpPlayList(this.id).subscribe((data: any) => {
    this.course = data
    });
  }

}
