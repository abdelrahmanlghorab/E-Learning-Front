import { Component } from '@angular/core';
import { GetTeacherService } from '../services/get-teacher.service';
import { RouterLink } from '@angular/router';
import { NgbRatingModule } from '@ng-bootstrap/ng-bootstrap';
import { RatingService } from '../services/rating.service';
import { TeacherCardComponent } from "./teacher-card/teacher-card.component";
@Component({
  selector: 'app-teacher',
  standalone: true,
  imports: [RouterLink, NgbRatingModule, TeacherCardComponent],
  templateUrl: './teacher.component.html',
  styleUrl: './teacher.component.css'
})
export class TeacherComponent {
  teachers :any;
  rating:any;
  ratingAverage:any;
  constructor(private teacher : GetTeacherService,private rateservice:RatingService){
    this.teacher.getAllTeachers().subscribe(data => {
      // console.log((data as any).data);
      this.teachers = (data as any).data;
      // console.log(this.teachers);
    });
  }
}
