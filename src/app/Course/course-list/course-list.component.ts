import { Component } from '@angular/core';
import { CardComponent } from "../../Shared/card/card.component";

@Component({
  selector: 'app-course-list',
  standalone: true,
  imports: [CardComponent],
  templateUrl: './course-list.component.html',
  styleUrl: './course-list.component.css'
})
export class CourseListComponent {

}
