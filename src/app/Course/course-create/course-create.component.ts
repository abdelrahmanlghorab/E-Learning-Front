import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CoursesService } from '../../services/courses.service';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms'; // Import ReactiveFormsModule

@Component({
  selector: 'app-course-create',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule], // Include ReactiveFormsModule
  templateUrl: './course-create.component.html',
  styleUrls: ['./course-create.component.css']
})
export class CourseCreateComponent implements OnInit {
  courseForm!: FormGroup; // Define the form group

  constructor(
    private fb: FormBuilder,
    private coursesService: CoursesService
  ) { }

  ngOnInit(): void {
    // Initialize the form with form controls and validations
    this.courseForm = this.fb.group({
      title: ['', [Validators.required, Validators.minLength(3)]],
      description: ['', [Validators.required, Validators.minLength(10)]],
      price: [{ value: '', disabled: false }, [Validators.required, Validators.min(0)]],
      is_free: [false],
      instructor_id: ['', Validators.required],
      playlist_id: ['', Validators.required]
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
}
