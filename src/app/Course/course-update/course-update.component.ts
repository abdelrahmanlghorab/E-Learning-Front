import { Component, OnInit, signal } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CoursesService } from '../../services/courses.service';
import { CommonModule } from '@angular/common';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatOptionModule } from '@angular/material/core';
import { ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
@Component({
  selector: 'app-course-update',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, MatFormFieldModule, MatSelectModule, MatOptionModule],
  templateUrl: './course-update.component.html',
  styleUrl: './course-update.component.css'
})
export class CourseUpdateComponent {
  courseForm!: FormGroup;
  id: number = 0;
  submitted: boolean = false;
  courses: any;
  instructors: any;
  title=signal("");
  description=signal("");
  thumbnail=signal("");
  instructor_id=signal("");
  playlistId=signal("");
  constructor(
    private fb: FormBuilder,
    private coursesService: CoursesService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];
    this.coursesService.getCourse(this.id).subscribe(
      (response) => {
        this.courseForm.patchValue(response);
      },
      (error) => {
        console.error('Error fetching course details', error);
      }
    );

    this.courseForm = this.fb.group({
      title: ['', [Validators.required, Validators.minLength(3)]],
      description: ['', [Validators.required, Validators.minLength(10)]],
      price: [{ value: '', disabled: false }, [Validators.required, Validators.min(0)]],
      is_free: [false],
      instructor_id: ['', Validators.required],
      playlist_id: ['', Validators.required],
      thumbnail:[''],
      course_type: ['', Validators.required],
      live_platform : [''],
      live_link : [''],
      live_schedule : [''],
    });

    // Toggle price field based on whether the course is free
    this.courseForm.get('is_free')?.valueChanges.subscribe((isFree) => {
      if (isFree) {
        this.courseForm.get('price')?.disable(); // Disable price input if free
        this.courseForm.get('price')?.setValue(0);
      } else {
        this.courseForm.get('price')?.enable(); // Enable price input if not free
      }
    });
  }

  // Method to submit the form data
  updateCourse() {
    if (this.courseForm.valid) {
      this.coursesService.updateCourse(this.id,this.courseForm.value).subscribe(
        (response) => {
          this.router.navigate(['/courses']);
          alert('Course updated successfully');


        },
        (error) => {
          alert('Error updating course');
        }
      );
    } else {
      console.log('Form is invalid');
    }
  }
  setCourseValue(id: any){
    for(let course of this.courses){
      if(course.id === id){
        this.title.set(course.title);
        this.description.set(course.description);
        this.thumbnail.set(course.thumbnail);
        this.courseForm.patchValue({
          title: this.title(),
          description: this.description(),
          thumbnail:this.thumbnail(),
        });
        break;
      };
    }
  }
  setInstructorValue(id: any){
    for(let instructor of this.instructors){
      if(instructor.id === id){
        this.instructor_id.set(instructor.id);
        this.courseForm.patchValue({
          instructor_id: this.instructor_id(),
        });
        break;
      };
  }
}
}
