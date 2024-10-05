import { Component } from '@angular/core';
import { CoursesService } from '../../services/courses.service';
import { ActivatedRoute, ActivatedRouteSnapshot, Router } from '@angular/router';
import { CoursePlaylistService } from '../../services/course-playlist.service';
import { GetTeacherService } from '../../services/get-teacher.service';

@Component({
  selector: 'app-course-detail',
  standalone: true,
  imports: [],
  templateUrl: './course-detail.component.html',
  styleUrl: './course-detail.component.css'
})
export class CourseDetailComponent {
  course: any;
  courseVideos: any;
  id:any;
  teacher: any;

  constructor(private playList:CoursePlaylistService,private courseService: CoursesService, public router: Router, private activatedRoute: ActivatedRoute,private teacherService: GetTeacherService) {
  }
  ngOnInit() {
    this.id = this.activatedRoute.snapshot.params['id'];
    this.courseService.getCourse(this.id).subscribe((data: any) => {
    this.course = data
    console.log(this.course);
    this.teacherService.getTeacher(this.course.instructor_id).subscribe((data: any) => {
      this.teacher = data.data[0]
      console.log(this.teacher);
    })
    this.playList.getpPlayList(this.course.playlist_id).subscribe((data: any) =>(this.courseVideos=data[0].videos))
    });

  }


}
