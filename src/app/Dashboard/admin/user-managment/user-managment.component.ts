import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { UserService } from '../../../services/user.service';

@Component({
  selector: 'app-user-managment',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './user-managment.component.html',
  styleUrl: './user-managment.component.css'
})
export class UserManagmentComponent {
  users: any;
constructor(private UserServices: UserService) {}
ngOnInit(): void {
  this.UserServices.getAllCourses().subscribe(
    (response) => {
      this.users = response;
    },
    (error) => {
      console.error('Error fetching Users', error);
    }
  );
}
removeUser(id: number) {
  const issure =confirm('Are you sure you want to delete this User?');
  if (!issure) {
    return;
  }
  this.UserServices.deleteCourse(id).subscribe(
    (response) => {
      alert('User deleted successfully');
      this.users = this.users.filter((users: any) => users.id !== id);
    },
    (error) => {
      alert('Error deleting User');
    }
  );
}

}
