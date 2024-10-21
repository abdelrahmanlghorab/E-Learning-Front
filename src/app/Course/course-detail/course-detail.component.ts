import { Component, Input } from '@angular/core';
import { CoursesService } from '../../services/courses.service';
import { ActivatedRoute, ActivatedRouteSnapshot, Router, RouterLink } from '@angular/router';
import { CoursePlaylistService } from '../../services/course-playlist.service';
import { GetTeacherService } from '../../services/get-teacher.service';
import { EnrollmentService } from '../../services/enrollment.service';
import { TruncatePipe } from '../../Pipes/truncate.pipe';
import { CustomDatePipe } from '../../Pipes/custom-date.pipe';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommentsService } from '../../services/comments.service';
import { CommonModule } from '@angular/common';
import { PaymentService } from '../../services/payment.service';
import { ToastrService } from 'ngx-toastr';
import { RatingService } from '../../services/rating.service';
import { NgbRatingModule } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-course-detail',
  standalone: true,
  imports: [RouterLink, TruncatePipe, CustomDatePipe, ReactiveFormsModule, CommonModule,NgbRatingModule],
  templateUrl: './course-detail.component.html',
  styleUrl: './course-detail.component.css'
})
export class CourseDetailComponent {
  disabled = false;
  selected = 0;
	hovered = 0;
  user_id!: any;
  ratingAverage =0;
  data: any;
  name!: string;
  image!: string;
  role_id!: any;
  id!: any;
  isloggedIn: boolean = false;

  @Input() courseId!: number;
  comments: any[] = [];
  body: any = '';
  course: any;
  courseID: any;
  courseTitle: string = "Course";
  courseImage: string = "Course Image";
  courseDescription: string = "Descriptions of the Course";
  coursePrice: any;
  courseCreation: string = "Creation of the Course";
  courseVideos: any;
  courseVideosNum: any;
  courseType!: string;
  courseSchedule: any;
  courseDateConfirm:any;
  remainingSessionsDays:any;

  form = new FormGroup({
    inputName: new FormControl(''),
  });

  teacher: any;
  courseInstructor: string = "Instructor";
  instructorTitle: string = "title";
  instructorDescription: string = "description";
  instructorImage: string = "";
  instructourEmail: string = "email";
  teacherGender: string = "gender";
  truncate = new TruncatePipe();
  enrollment: boolean = false;
  courseDetails!: string;
  coursePlatform!: string;
  rating: any;
  constructor(private playList: CoursePlaylistService,
    private courseService: CoursesService,
    public router: Router,
    private activatedRoute: ActivatedRoute,
    private teacherService: GetTeacherService,
    private enrollmentService: EnrollmentService,
    private fb: FormBuilder,
    private commentService: CommentsService,
    private paymentService: PaymentService,
    private toaster: ToastrService,
    private rateService: RatingService
  ) {

  }
  ngOnInit() {
    this.data = localStorage.getItem('data');
    if (this.data) {
      this.data = JSON.parse(this.data);
      this.name = this.data.name;
      this.image = this.data.image;
      this.role_id = this.data.role_id;
      this.id = this.data.id;
      this.user_id = this.data.id;
    }

    this.id = this.activatedRoute.snapshot.params['id'];
    this.courseService.getCourse(this.id).subscribe((data: any) => {

      this.course = data;
      console.log(this.course);
      this.courseID = data.id;
      this.courseCreation = new CustomDatePipe().transform(this.course.created_at);
      this.courseTitle = this.course.title;
      this.courseType = this.course.course_type;
      this.courseImage = this.course.thumbnail;
      this.courseDescription = new TruncatePipe().transform(this.course.description, 750);
      this.coursePrice = this.course.price;
      this.courseDetails = this.course.live_details
      this.coursePlatform = this.course.live_platform
      this.courseSchedule = new CustomDatePipe().transform( this.course.live_schedule);
      this.courseDateConfirm = new CustomDatePipe().transform(Date.now());
      this.remainingSessionsDays = Math.floor((Date.parse(this.courseSchedule) - Date.now()) / (1000 * 60 * 60 * 24));
      console.log(this.courseDateConfirm);


      this.teacherService.getTeacher(this.course.instructor_id).subscribe((data: any) => {
        this.teacher = data.teacher
        this.teacherGender = this.teacher.gender
        this.courseInstructor = this.teacher.name;
        this.instructorTitle = this.teacher.title;
        this.instructorDescription = this.teacher.description;
        this.instructorImage = this.teacher.image;
        this.instructourEmail = this.teacher.email;
      })
      if(this.course.playlist_id){
      this.playList.getpPlayList(this.course.playlist_id).subscribe((data: any) => (
        this.courseVideos = data[0].videos,
        this.courseVideosNum = data[0].videos.length
      ));
    }
      this.enrollmentService.getEnrollmentById(this.id).subscribe((data: any) => {
        this.enrollment = data.enrolled;
      });
    });

    this.commentService.getComments(this.id).subscribe(
      (data) => {
        this.comments = data;
        console.log(data, 'Comments');

      },
      (error) => {
        console.error('Error fetching comments:', error);
      }
    );
    this.rateService.getcourseRating(this.id).subscribe(
      (data) => {
        this.rating = data;
        this.selected = this.rating.find((item: any) => item.user_id === this.user_id).rating;
        if(this.selected>0){
          this.disabled = true;
        }
        this.ratingAverage = this.rating.reduce((acc: any, item: any) => acc + item.rating, 0) / this.rating.length;
        console.log(this.ratingAverage);
        console.log(this.rating);
    },
    (error) => {
        console.error('Error fetching comments:', error);
      }
    );
  }
  click(): void {
    const control = this.form.get('inputName');
    const CommentData: any = {
      body: control?.value
    }
    if(!control?.value){
      this.toaster.error('Please Enter Your Comment')
      return
    }
    this.commentService.addComment(this.id, CommentData).subscribe(
      (CommentData) => {
        console.log('Comment posted successfully:', CommentData);
        this.comments.push(CommentData);
        this.form.reset();
        this.commentService.getComments(this.id).subscribe(
          (data) => {
            this.comments = data;
            console.log(data, 'Comments');

          },
          (error) => {
            console.error('Error fetching comments:', error);
          }
        );

      },
      (error) => {
        console.error('Error posting comment:', error);
      }
    );
  }

  deleteComment(commentId: number) {
    this.commentService.deleteComment(commentId).subscribe({
      next: (response) => {
        this.comments = this.comments.filter(comment => comment.id !== commentId);
      },
      error: (error) => {
        console.error('Error deleting comment:', error);
      }
    });
  }
  freeEnroll() {
    this.paymentService.createPaymentIntent(this.courseID).subscribe({
      next: (response) => {
        console.log('PaymentIntent created successfully:', response);
        this.enrollment = true;
        this.toaster.success('Enrolled successfully');
      },
      error: (error) => {
        this.toaster.error('Error creating payment intent:', error);
      }
    })
  }
  submitRate() {
    if (!this.selected) {
      return;
    }
    this.rateService.setCourseRating(this.id, this.selected).subscribe({
      next: (response) => {
        console.log('Rating submitted successfully:', response);
        this.rateService.getcourseRating(this.id).subscribe(
          (data) => {
            this.rating = data;
            this.selected = this.rating.find((item: any) => item.user_id === this.user_id).rating;
            if(this.selected>0){
              this.disabled = true;
            }
            this.ratingAverage = this.rating.reduce((acc: any, item: any) => acc + item.rating, 0) / this.rating.length;
            console.log(this.ratingAverage);
            console.log(this.rating);
        },
        (error) => {
            console.error('Error fetching comments:', error);
          }
        );
      },
      error: (error) => {
        console.error('Error submitting rating:', error);
      }
    })
  }
}
