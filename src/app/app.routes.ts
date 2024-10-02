import { NotFoundComponent } from './not-found/not-found.component';
import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { SignInComponent } from './Auth/sign-in/sign-in.component';
import { StudentSignUPComponent } from './Auth/Registeration/student-sign-up/student-sign-up.component';
import { ForgetPasswordComponent } from './Auth/forget-password/forget-password.component';
import { CourseListComponent } from './Course/course-list/course-list.component';
import { CourseDetailComponent } from './Course/course-detail/course-detail.component';
import { CourseCreateComponent } from './Course/course-create/course-create.component';
import { CourseUpdateComponent } from './Course/course-update/course-update.component';
import { CourseViewComponent } from './Course/course-view/course-view.component';
import { AdminComponent } from './Dashboard/admin/admin.component';

export const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    title: 'Home Page ',
  },
  {
    path: 'signin',
    component: SignInComponent,
    title: 'Sign In',
  },
  {
    path: 'studentSignup',
    component: StudentSignUPComponent,
    title: 'Student Sign Up',
  },
  {
    path: 'forgetPassword',
    component: ForgetPasswordComponent,
    title: 'Forget Password',
  },
  {
    path: 'courses',
    component: CourseListComponent,
    title: 'Our Courses',
  },
  {
    path: 'course/:id',
    component: CourseDetailComponent,
    title: 'Course Detail',
  },
  {
    path: 'coursecreate',
    component: CourseCreateComponent,
    title: 'Create Course',
  },
  {
    path: 'courseupdate/:id',
    component: CourseUpdateComponent,
    title: 'Update Course',
  },
  {
    path:'admin',
    component: AdminComponent,
    title: 'Admin',
  },
  {
    path: 'admin/courses',
    component: CourseViewComponent,
    title: 'Courses',
  },
  {
    path: '**',
    component: NotFoundComponent,
    title: 'Error',
  }
];
