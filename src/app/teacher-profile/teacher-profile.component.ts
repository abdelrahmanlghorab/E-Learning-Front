import { Component } from '@angular/core';
import { GetTeacherService } from '../services/get-teacher.service';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { TruncatePipe } from '../Pipes/truncate.pipe';
import { RatingService } from '../services/rating.service';
import { NgbRatingModule } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-teacher-profile',
  standalone: true,
  imports: [RouterLink,NgbRatingModule],
  templateUrl: './teacher-profile.component.html',
  styleUrl: './teacher-profile.component.css'
})
export class TeacherProfileComponent {
  id:any;
  teacher: any;
  api: any;
  teacherName: any;
  teacherImage: any;
  teacherDescription: any;
  teacherTitle: any;
  teacherEmail: any;
  teacherPhone: any;
  teacherCourses: any;
  coursesCount: any;
  courseStudentCount: number=0;
  truncate = new TruncatePipe();
  rating:any;
  teacherRate:any;
  disabled = false;
  selected = 0;
	hovered = 0;
  user_id :any;
  isenrolled=false;
constructor( private getteacher :GetTeacherService , public router: Router, private activatedRoute: ActivatedRoute,private ratingService: RatingService) {
  this.id = this.activatedRoute.snapshot.params['id'];
  this.user_id = JSON.parse(localStorage.getItem('data')!).id;
  this.getteacher.getTeacher(this.id).subscribe((data) => {
      this.api = data,

      this.teacher=this.api.teacher,
    this.teacherName = this.teacher.name;
    this.teacherImage = this.teacher.image;
    this.teacherDescription = this.teacher.description;
    this.teacherTitle = this.teacher.title;
    this.teacherEmail = this.teacher.email;
    this.teacherPhone = this.teacher.phone;
    this.coursesCount = this.api.courses_count;

      this.teacherCourses = this.api.courses;

      for(let course of this.teacherCourses){
        this.courseStudentCount += Number(course.Student_count);
        }



  });
}
ngOnInit() {
  console.log(Number(this.id),this.user_id);
  this.ratingService.checkTeacherCourses(Number(this.id),Number(this.user_id)).subscribe((data: any) => {
    console.log(data);
    this.isenrolled = data.enrolled;
    console.log(this.isenrolled);
  });
  this.ratingService.getteacherRating(this.id).subscribe((data: any) => {
    this.rating = data;
    this.selected = this.rating.find((rating: any) => rating.user_id === this.user_id).rating;
    console.log(this.selected);
    this.rating = this.getRatingAverage(this.rating);
    if (this.selected) {
      this.disabled = true;
    }
  });
}
getRatingAverage(ratings: any[]): number {
  if (ratings.length === 0) {
    return 0;
  }

  const totalRating = ratings.reduce((total, rating) => total + rating.rating, 0);
  return totalRating / ratings.length;
}

submitRate() {
  if (!this.selected) {
    return;
  }

  this.ratingService.setTeacherRating(this.id, this.selected).subscribe({
    next: (response) => {
      this.teacherRate = this.selected;
      console.log('Rating submitted successfully:', response);
      this.disabled = true;

      this.ratingService.getteacherRating(this.id).subscribe((data: any) => {
        this.rating = data;

        this.selected = this.rating.find((rating: any) => rating.user_id === this.user_id).rating;

        this.rating = this.getRatingAverage(this.rating);
        console.log(this.rating);

        if (this.selected) {
          this.disabled = true;
        }
      });
    },
    error: (error) => {
      console.error('Error submitting rating:', error);
    }
  });
}

}
