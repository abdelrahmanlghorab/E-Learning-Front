import { Component, OnInit, signal } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CoursesService } from '../../services/courses.service';
import { CommonModule } from '@angular/common';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatOptionModule } from '@angular/material/core';
import { ReactiveFormsModule } from '@angular/forms'; // Import ReactiveFormsModule
import { CoursePlaylistService } from '../../services/course-playlist.service';
import { GetTeacherService } from '../../services/get-teacher.service';
import { Router, RouterLink } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CategoriesService } from '../../services/categories.service';

@Component({
  selector: 'app-course-create',
  standalone: true,
  imports: [ RouterLink,CommonModule, ReactiveFormsModule, MatFormFieldModule, MatSelectModule, MatInputModule,MatOptionModule], // Include ReactiveFormsModule
  templateUrl: './course-create.component.html',
  styleUrls: ['./course-create.component.css']
})
export class CourseCreateComponent implements OnInit {
  courseForm!: FormGroup;
  submitted: boolean = false;
  courses: any;
  categories: any;
  instructors: any;
  title=signal("");
  description=signal("");
  thumbnail=signal("");
  instructor_id=signal("");
  playlistId=signal("");
  category_id = signal("");
  constructor(
    private fb: FormBuilder,
    private playList: CoursePlaylistService,
    private teachersService: GetTeacherService,
    private coursesService: CoursesService,
    private router: Router,
    private toaster:ToastrService,
    private category: CategoriesService
  ) { }

  ngOnInit(): void {

    this.playList.getAllPlayLists().subscribe(courseData =>{
      this.courses = courseData;
    });
    this.teachersService.getAllTeachers().subscribe(teacherData => {
      this.instructors = teacherData;
      this.instructors = this.instructors.data;
    });

    this.courseForm = this.fb.group({
      title: ['', [Validators.required, Validators.minLength(3)]],
      description: ['', [Validators.required, Validators.minLength(10)]],
      price: [{ value: '', disabled: false }, [Validators.required, Validators.min(0)]],
      is_free: [false],
      instructor_id: ['', Validators.required],
      playlist_id: [''],
      thumbnail:[this.thumbnail()],
      course_type: ['', Validators.required],
      live_platform : [''],
      live_link : [''],
      live_schedule : [''],
      live_details : [''],
      category_id: ['', Validators.required],
    });

    this.courseForm.get('is_free')?.valueChanges.subscribe((isFree) => {
      if (isFree) {
        this.courseForm.get('price')?.disable();
        this.courseForm.get('price')?.setValue(0);
      } else {
        this.courseForm.get('price')?.enable();
      }
    });
    this.category.getAllCategories().subscribe(categoryData => {
      this.categories = categoryData;
      // this.categories = this.categories.data;
    });
  }

  createCourse() {
    this.submitted = true;
    if (this.courseForm.valid) {
      this.submitted = false;
      this.coursesService.createCourse(this.courseForm.value).subscribe(
        {
          next: (response) => {
            console.log('Course created successfully', response);
            this.courseForm.reset();
            this.router.navigate(['courses']);
            this.toaster.success('Course created successfully');

          },
          error: (error) => {
            console.error('Error creating course', error);
            this.toaster.error('Error creating course');
          }

        }
      );
    } else {
      console.log('Form is invalid');
      this.toaster.warning('Form is invalid');
      return;
    }
  }
  setCourseValue(id: any){
    for(let course of this.courses){
      if(course.id == id){
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
          category_id: this.category_id()
        });
        break;
      };
  }
}

}
