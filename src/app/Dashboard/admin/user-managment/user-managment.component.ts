import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { UserService } from '../../../services/user.service';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-user-managment',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './user-managment.component.html',
  styleUrl: './user-managment.component.css'
})
export class UserManagmentComponent {
  users: any;  
  constructor(private userService: UserService, private router: Router) { }

  ngOnInit(): void {
    this.userService.getAllStudent().subscribe(
      (response) => {
        this.users = response;
        console.log(this.users.length,"users");
      },
      (error) => {
        console.error('Error fetching Users', error);
      }
    );
  }

  removeUser(id: number) {
    Swal.fire({
      title: 'Confirm Action',
      text: 'Do you want to proceed?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, go ahead',
      cancelButtonText: 'No, cancel'
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire('Confirmed', 'Your action has been confirmed!', 'success');
        this.userService.removeStudent(id).subscribe(
          (response) => {
            this.users = this.users.filter((user: any) => user.id !== id);
            this.router.navigate(['/admin/restoreuser']);
    
          },
          (error) => {
            alert('Error deleting user');
            console.error('Error deleting user:', error);
          }
        );
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        Swal.fire('Cancelled', 'Your action has been cancelled', 'error');
      }
    });
  }

  
}
