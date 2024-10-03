import { Component, OnInit, signal } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CoursesService } from '../../services/courses.service';
import { CommonModule } from '@angular/common';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatOptionModule } from '@angular/material/core';
import { ReactiveFormsModule } from '@angular/forms'; // Import ReactiveFormsModule

@Component({
  selector: 'app-course-create',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, MatFormFieldModule, MatSelectModule, MatInputModule,MatOptionModule], // Include ReactiveFormsModule
  templateUrl: './course-create.component.html',
  styleUrls: ['./course-create.component.css']
})
export class CourseCreateComponent implements OnInit {
  courseForm!: FormGroup; 
  courses: any;
  title=signal("");
  description=signal("");
  constructor(
    private fb: FormBuilder,
    private coursesService: CoursesService
  ) { }

  ngOnInit(): void {

    this.coursesService.getAllCourses().subscribe(courseData =>{
      this.courses = courseData;
      console.log(this.courses);
    });

    this.courseForm = this.fb.group({
      title: ['', [Validators.required, Validators.minLength(3)]],
      description: ['', [Validators.required, Validators.minLength(10)]],
      price: [{ value: '', disabled: false }, [Validators.required, Validators.min(0)]],
      is_free: [false],
      instructor_id: ['', Validators.required],
      courseSelected: ['', Validators.required],
      playlist_id: ['', Validators.required]
    });

    this.courseForm.get('is_free')?.valueChanges.subscribe((isFree) => {
      if (isFree) {
        this.courseForm.get('price')?.disable(); 
        this.courseForm.get('price')?.setValue(0);
      } else {
        this.courseForm.get('price')?.enable(); 
      }
    });
  }

  createCourse() {
    if (this.courseForm.valid) {
      this.coursesService.createCourse(this.courseForm.value).subscribe(
        (response) => {
          console.log('Course created successfully', response);
        },
        (error) => {
          console.error('Error creating course', error);
        }
      );
    } else {
      console.log('Form is invalid');
    }
  }
  settitle(id: any){
    for(let course of this.courses){
      if(course.id === id){
        this.title.set(course.title);
        this.description.set(course.description);
        console.log('Course', this.title());
        break;
      };
    }
  }
}
