import { NotFoundComponent } from './not-found/not-found.component';
import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { SignInComponent } from './Auth/sign-in/sign-in.component';
import { StudentSignUPComponent } from './Auth/Registeration/student-sign-up/student-sign-up.component';

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
    path: '**',
    component: NotFoundComponent,
    title: 'Error',
  }
];
