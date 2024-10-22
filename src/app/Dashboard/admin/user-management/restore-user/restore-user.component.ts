import { Component } from '@angular/core';
import { UserService } from '../../../../services/user.service';
import { FormBuilder } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-restore-user',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './restore-user.component.html',
  styleUrl: './restore-user.component.css'
})
export class RestoreUserComponent {
  users: any;
  items: any[] = []
  constructor(private fb: FormBuilder, private router : Router,private userServices : UserService){}

ngOnInit(){
  this.userServices.getAllTrashedStudent().subscribe((data: any) => {
    this.users = data.data;
    console.log(data);
  });
}
restoreUser(id: number) {
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
      this.userServices.restoreStudent(id).subscribe(
        (response) => {
          alert('User restored successfully');
          this.router.navigate(['/admin/user-managment']);
        },
        (error) => {
          alert('Error restoring user');
          console.error('Error restoring user:', error);
        }
      );
    } else if (result.dismiss === Swal.DismissReason.cancel) {
      Swal.fire('Cancelled', 'Your action has been cancelled', 'error');
    }
  });
}
}
