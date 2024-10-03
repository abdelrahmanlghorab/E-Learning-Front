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
  instructors: any;
  title=signal("");
  description=signal("");
  thumbnail=signal("");
  instructor_id=signal("");
  playlistId=signal("");
  instructor_name=signal("");
  constructor(
    private fb: FormBuilder,
    private coursesService: CoursesService
    ,private playList: CoursePlaylistService,
    private teachersService:GetTeacherService
  ) { }

  ngOnInit(): void {

    this.playList.getAllPlayLists().subscribe(courseData =>{
      this.courses = courseData;
      console.log(this.courses);
    });
    this.teachersService.getAllTeachers().subscribe(teacherData => {
      this.instructors = teacherData;
      this.instructors = this.instructors.data;
      console.log(this.instructors.data)

    });

    this.courseForm = this.fb.group({
      title: ['', [Validators.required, Validators.minLength(3)]],
      description: ['', [Validators.required, Validators.minLength(10)]],
      price: [{ value: '', disabled: false }, [Validators.required, Validators.min(0)]],
      is_free: [false],
      instructor_id: ['', Validators.required],
      courseSelected: ['', Validators.required],
      instructorSelected: ['', Validators.required],
      playlist_id: ['', Validators.required]
      ,thumbnail:[''],
      instructor_name:['']
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
    console.log(this.courseForm.value);
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
  setValue(id: any){
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
        console.log('Course', this.title());
        break;
      };
    }
    
  }
}
