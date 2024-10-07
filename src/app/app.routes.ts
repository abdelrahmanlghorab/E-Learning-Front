import { NotFoundComponent } from './not-found/not-found.component';
import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { SignInComponent } from './Auth/sign-in/sign-in.component';
import { StudentSignUPComponent } from './Auth/Registeration/student-sign-up/student-sign-up.component';
import { ForgetPasswordComponent } from './Auth/forget-password/forget-password.component';

import { CourseListComponent } from './Course/course-list/course-list.component';
import { CourseDetailComponent } from './Course/course-detail/course-detail.component';
import { TestListComponent } from './Test/test-list/test-list.component';
import { authGuard } from './Guard/auth.guard';
import { CourseCreateComponent } from './Course/course-create/course-create.component';
import { CourseUpdateComponent } from './Course/course-update/course-update.component';
import { CourseViewComponent } from './Course/course-view/course-view.component';
import { CreateComponent } from './Create-Teacher-Moderator/Create/create/create.component';
import { UpdateComponent } from './Create-Teacher-Moderator/update/update/update.component';
import { IndexComponent } from './Create-Teacher-Moderator/index/index/index.component';
import { AdminComponent } from './Dashboard/admin/admin.component';
import { UserManagmentComponent } from './Dashboard/admin/user-managment/user-managment.component';
import { PaymentComponent } from './Payment/payment/payment.component';
import { PaymentMangementComponent } from './Dashboard/admin/payment-mangement/payment-mangement.component';
import { TrashedComponent } from './Create-Teacher-Moderator/trashed/trashed/trashed.component';
import { TeacherComponent } from './teacher/teacher.component';
import { TestCreateComponent } from './Test/test-create/test-create.component';
import { TestUpdateComponent } from './Test/test-update/test-update.component';
import { TeacherProfileComponent } from './teacher-profile/teacher-profile.component';

export const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    title: 'Ana Kafuo ',
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
    path: 'tests',
    component: TestListComponent,
    title: 'All Tests',
    canActivate: [authGuard]
  },
  {
    path: 'test-create',
    component: TestCreateComponent,
    title: 'Create Tests',
    canActivate: [authGuard]
  },
  {
    path: 'test/:id/update',
    component: TestUpdateComponent,
    title: 'Update Tests',
    canActivate: [authGuard]
  },
  {
    path: 'forgetPassword',
    component: ForgetPasswordComponent,
    title: 'Forget Password',
  },
  {
    path: 'createorganizer',
    component: CreateComponent,
    title: 'Create Organizer',
  },
  {
    path: 'updateorganizer/:id',
    component: UpdateComponent,
    title: 'Update Organizer',
  },
  {
    path: 'allorganizer',
    component: IndexComponent,
    title: 'All Organizer',
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
    path: 'admin',
    component: AdminComponent,
    title: 'Admin',
  },
  {
    path: 'admin/courses',
    component: CourseViewComponent,
    title: 'Courses',
  },
  {
    path: 'admin/user-managment',
    component: UserManagmentComponent,
    title: 'User Managment',
  },
  {
    path: 'admin/payment',
    component: PaymentMangementComponent,
    title: 'Payments',
  },
  {
    path: 'createorganizer',
    component: CreateComponent,
    title: 'Create Organizer',
  },
  {
    path: 'updateorganizer/:id',
    component: UpdateComponent,
    title: 'Update Organizer',
  },
  {
    path: 'allorganizer',
    component: IndexComponent,
    title: 'All Organizer',
  },
  {
    path: 'trashorganizer',
    component: TrashedComponent,
    title:'Trashed organizer',
  },
  {
    path: 'payment/:id',
    component: PaymentComponent,
    title: 'Payment',
  },
  {
    path: 'teachers',
    component: TeacherComponent,
    title: 'teachers',
  },
  {
    path: 'teacherprofile/:id',
    component: TeacherProfileComponent,
    title: 'teacherProfile',
  },
  {
    path: '**',
    component: NotFoundComponent,
    title: 'Error',
  }

];
