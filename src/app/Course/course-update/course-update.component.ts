import { Component, OnInit, signal } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CoursesService } from '../../services/courses.service';
import { CommonModule } from '@angular/common';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatOptionModule } from '@angular/material/core';
import { ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { GetTeacherService } from '../../services/get-teacher.service';
import { CoursePlaylistService } from '../../services/course-playlist.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-course-update',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, MatFormFieldModule, MatSelectModule, MatOptionModule],
  templateUrl: './course-update.component.html',
  styleUrls: ['./course-update.component.css']
})
export class CourseUpdateComponent implements OnInit {
  courseForm!: FormGroup;
  id: number = 0;
  submitted: boolean = false;
  courses: any[] = [];
  instructors: any[] = [];
  playlist: any;
  title = signal("");
  description = signal("");
  thumbnail = signal("");
  instructor_id = signal("");
  playlistId = signal("");

  constructor(
    private fb: FormBuilder,
    private coursesService: CoursesService,
    private route: ActivatedRoute,
    private router: Router,
    private teachersService: GetTeacherService,
    private playList: CoursePlaylistService,
    private toaster: ToastrService
  ) { }

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];

    this.courseForm = this.fb.group({
      title: ['', [Validators.required, Validators.minLength(3)]],
      description: ['', [Validators.required, Validators.minLength(10)]],
      price: [{ value: ''}, [Validators.required, Validators.min(0)]],
      is_free: [false],
      instructor_id: ['', Validators.required],
      playlist_id: [''],
      thumbnail: [''],
      course_type: ['', Validators.required],
      live_platform: [''],
      live_link: [''],
      live_schedule: [''],
      live_details: [''],
    });

    this.playList.getAllPlayLists().subscribe(courseData => {
      this.playlist = courseData;
    });

    this.coursesService.getCourse(this.id).subscribe(
      (response: any) => {
        this.courseForm.patchValue(response);
        this.teachersService.getAllTeachers().subscribe((teacherData: any) => {
          this.instructors = teacherData.data;
          this.setInstructorValue(response.instructor_id);
        });
      },
      (error) => {
        console.error('Error fetching course details', error);
      }
    );

    this.courseForm.get('is_free')?.valueChanges.subscribe((isFree) => {
      if (isFree) {
        this.courseForm.get('price')?.disable();
        this.courseForm.get('price')?.setValue(0);
      } else {
        this.courseForm.get('price')?.enable();
      }
    });
  }

  updateCourse() {
    this.submitted = true;

    if (this.courseForm.valid) {
      this.coursesService.updateCourse(this.id, this.courseForm.value).subscribe(
        {
          next: (response) => {
            this.router.navigate(['/courses']);
            this.toaster.success('Course updated successfully');
          },
          error: (error) => {
            this.toaster.error('Error updating course');
          }
        }
      )};
    }


  setCourseValue(id: any) {
    const selectedCourse = this.courses.find(course => course.id === id);
    if (selectedCourse) {
      this.title.set(selectedCourse.title);
      this.description.set(selectedCourse.description);
      this.thumbnail.set(selectedCourse.thumbnail);
      this.courseForm.patchValue({
        title: this.title(),
        description: this.description(),
        thumbnail: this.thumbnail(),
      });
    }
  }

  setInstructorValue(id: any) {
    const selectedInstructor = this.instructors.find(instructor => instructor.id === id);
    if (selectedInstructor && this.courseForm.get('instructor_id')?.value !== selectedInstructor.id) {
      this.courseForm.patchValue({
        instructor_id: selectedInstructor.id,
      });
    }
  }

}
