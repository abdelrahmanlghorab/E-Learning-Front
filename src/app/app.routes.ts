import { NotFoundComponent } from './not-found/not-found.component';
import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { SignInComponent } from './Auth/sign-in/sign-in.component';
import { StudentSignUPComponent } from './Auth/Registeration/student-sign-up/student-sign-up.component';
import { ForgetPasswordComponent } from './Auth/forget-password/forget-password.component';
import { CourseListComponent } from './Course/course-list/course-list.component';
import { CourseDetailComponent } from './Course/course-detail/course-detail.component';

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
    path: '**',
    component: NotFoundComponent,
    title: 'Error',
  }
];
