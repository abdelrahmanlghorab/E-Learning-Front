import { Component, Input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { GetTeacherService } from '../../services/get-teacher.service';
import { AuthService } from '../../services/Auth/auth.service';
import { RatingService } from '../../services/rating.service';
import { NgbRatingModule } from '@ng-bootstrap/ng-bootstrap';
import { CategoriesService } from '../../services/categories.service';
@Component({
  selector: 'app-card',
  standalone: true,
  imports: [RouterLink,NgbRatingModule],
  templateUrl: './card.component.html',
  styleUrl: './card.component.css'
})
export class CardComponent {

  @Input() course!: any;
  rating: any;
  ratingAverage: any;
  teacher!: any;
  teacherName!: any;
  teacherImage: any;
  categories: any;
  categoryName!: any;
  

  constructor(private teacherService:GetTeacherService , private authservices :AuthService,private rateservice:RatingService,private category:CategoriesService) {
  }


  ngOnInit(){
  this.teacherService.getTeacher(this.course.instructor_id).subscribe((data: any) => {
         this.teacher = data.teacher
         this.teacherName=this.teacher.name;
        this.teacherImage = this.teacher.image;

       });
       this.rateservice.getcourseRating(this.course.id).subscribe((data: any) => {
        this.rating = data;
        if(this.rating.length == 0){
          this.ratingAverage = 0;
        }
        this.ratingAverage = this.rating.reduce((sum: any, rating: any) => sum + rating.rating, 0) / this.rating.length;
       });
    this.category.getAllCategories().subscribe((data: any) => {
      this.categories = data;
     this.categoryName = this.categories.find((item: any) => item.id === this.course.category_id).name;
    });
      }

  handleMouseMove(event: MouseEvent) {
    const card = (event.target as HTMLElement).closest('.example-card') as HTMLElement;
    if (card) {
      const cardRect = card.getBoundingClientRect();
      const mouseX = event.clientX - cardRect.left;
      const mouseY = event.clientY - cardRect.top;
      const shadowX = (mouseX - cardRect.width / 2) / 10;
      const shadowY = (mouseY - cardRect.height / 2) / 10;
      card.style.transform = `rotateX(${-shadowY}deg) rotateY(${shadowX}deg)`;
      card.style.boxShadow = `${shadowX}px ${shadowY}px 10px 5px var(--border), var(--border) 0px 0px 0px 1px`;
    }
  }

  handleMouseLeave(event: MouseEvent) {
    const card = (event.target as HTMLElement).closest('.example-card') as HTMLElement;
    if (card) {
      card.style.transform = '';
      card.style.boxShadow = ''
    }
  }

}


