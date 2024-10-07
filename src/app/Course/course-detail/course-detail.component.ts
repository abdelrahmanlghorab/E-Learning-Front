import { Component } from '@angular/core';
import { CoursesService } from '../../services/courses.service';
import { ActivatedRoute, ActivatedRouteSnapshot, Router , RouterLink} from '@angular/router';
import { CoursePlaylistService } from '../../services/course-playlist.service';
import { GetTeacherService } from '../../services/get-teacher.service';
import { EnrollmentService } from '../../services/enrollment.service';
import { TruncatePipe } from '../../Pipes/truncate.pipe';
import { CustomDatePipe } from '../../Pipes/custom-date.pipe';

@Component({
  selector: 'app-course-detail',
  standalone: true,
  imports: [RouterLink, TruncatePipe, CustomDatePipe],
  templateUrl: './course-detail.component.html',
  styleUrl: './course-detail.component.css'
})
export class CourseDetailComponent {
  id: any;

  course: any;
  courseID:any;
  courseTitle: string="Course";
  courseImage: string="Course Image";
  courseDescription: string="Descriptions of the Course";
  coursePrice:any;
  courseCreation: string="Creation of the Course";
  courseVideos: any;
  courseVideosNum: any;

  teacher: any;
  courseInstructor: string = "Instructor";
  instructorTitle: string = "title";
  instructorDescription: string = "description";
  instructorImage: string="";
  instructourEmail: string="email";
  truncate= new TruncatePipe();
  enrollment:boolean=false;
  constructor(private playList:CoursePlaylistService,private courseService: CoursesService, public router: Router, private activatedRoute: ActivatedRoute,private teacherService: GetTeacherService,private enrollmentService:EnrollmentService) {
  }
  ngOnInit() {
    this.id = this.activatedRoute.snapshot.params['id'];
    this.courseService.getCourse(this.id).subscribe((data: any) => {

    this.course = data
    this.courseID=data.id;
    this.courseCreation = new CustomDatePipe().transform(this.course.created_at);
    this.courseTitle = this.course.title;
    this.courseImage = this.course.thumbnail;
    this.courseDescription = new TruncatePipe().transform(this.course.description,750) ;
    this.coursePrice = this.course.price;

    this.teacherService.getTeacher(this.course.instructor_id).subscribe((data: any) => {
    this.teacher = data.teacher[0]
    this.courseInstructor = this.teacher.name;
    this.instructorTitle = this.teacher.title;
    this.instructorDescription = this.teacher.description;
    this.instructorImage = this.teacher.image;
    this.instructourEmail = this.teacher.email;
    })
    this.playList.getpPlayList(this.course.playlist_id).subscribe((data: any) =>(
      this.courseVideos=data[0].videos,
      this.courseVideosNum = data[0].videos.length
    ));
    this.enrollmentService.getEnrollmentById(this.id).subscribe((data: any) => {
      this.enrollment = data.enrolled;
      console.log(this.enrollment);
      });
    });
  }

}
