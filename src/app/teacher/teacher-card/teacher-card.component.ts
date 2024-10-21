import { Component, Input } from '@angular/core';
import { NgbRatingModule } from '@ng-bootstrap/ng-bootstrap';
import { RatingService } from '../../services/rating.service';
import { Router, RouterLink } from '@angular/router';
@Component({
  selector: 'app-teacher-card',
  standalone: true,
  imports: [NgbRatingModule,RouterLink],
  templateUrl: './teacher-card.component.html',
  styleUrl: './teacher-card.component.css'
})
export class TeacherCardComponent {
  @Input() teacher: any;
  rating: any;
  ratingAverage: any;
  constructor(private router: Router, private ratingService: RatingService) { }
  ngOnInit() {
    this.ratingService.getteacherRating(this.teacher.id).subscribe(
      (ratings: any) => {
        this.rating = ratings;
        this.ratingAverage = this.getRatingAverage(ratings);
      },
      (error) => {
        console.error('Error fetching ratings:', error);
      }
    );
  }

  
  getRatingAverage(ratings: any[]): number {
    if (ratings.length === 0) {
      return 0;
    }
    const sum = ratings.reduce((total, rating) => total + rating.rating, 0);
    return sum / ratings.length;
  }
}
