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
  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.userService.getAllStudent().subscribe(
      (response) => {
        this.users = response;
        console.log(this.users,"users");
      },
      (error) => {
        console.error('Error fetching Users', error);
      }
    );
  }

  removeUser(id: number) {
    const confirmDelete = confirm('Are you sure you want to delete this user?');
    if (!confirmDelete) {
      return;
    }

    this.userService.removeStudent(id).subscribe(
      (response) => {
        alert('User deleted successfully');
        this.users = this.users.filter((user: any) => user.id !== id);
      },
      (error) => {
        alert('Error deleting user');
        console.error('Error deleting user:', error);
      }
    );
  }

  restoreUser(id: number) {
    this.userService.restoreStudent(id).subscribe(
      (response) => {
        alert('User restored successfully');
      },
      (error) => {
        alert('Error restoring user');
        console.error('Error restoring user:', error);
      }
    );
  }
}
