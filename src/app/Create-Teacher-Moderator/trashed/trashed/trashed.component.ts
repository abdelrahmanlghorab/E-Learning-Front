import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { CreateOrganizerService } from '../../../services/create-organizer.service';
import { Router, RouterLink } from '@angular/router';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-trashed',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './trashed.component.html',
  styleUrl: './trashed.component.css'
})
export class TrashedComponent {
  organizer: any;
  items: any[] = []
  constructor(private fb: FormBuilder, private router : Router,private Organizerservece : CreateOrganizerService){}

ngOnInit(){
  this.Organizerservece.getAllTrashedOrganizer().subscribe((data: any) => {
    this.organizer = data.data;
    console.log(data);
  });
}
  restoreItem(item: any) {
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
        this.Organizerservece.restoreorganizer(item.id).subscribe(
          (response) => {
            this.router.navigateByUrl('/allorganizer');
            console.log('Item restored successfully', response);
          },
          (error) => {
            console.error('Error restoring item', error);
          }
        );
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        Swal.fire('Cancelled', 'Your action has been cancelled', 'error');
      }
    });

  }
}
