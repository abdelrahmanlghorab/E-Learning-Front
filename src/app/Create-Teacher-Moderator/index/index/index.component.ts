
import { FormBuilder } from '@angular/forms';
import { CreateOrganizerService } from './../../../services/create-organizer.service';
import { Component } from '@angular/core';
import { Route, Router, RouterLink } from '@angular/router';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-index',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './index.component.html',
  styleUrl: './index.component.css'
})
export class IndexComponent {
  organizer: any;
  items: any[] = []
constructor(private fb: FormBuilder,private router : Router,private Organizerservece : CreateOrganizerService){}
  ngOnInit(){
    this.Organizerservece.getAllorganizer().subscribe((data: any) => {
      this.organizer = data.data;
      // console.log(data.data);
      
    });
  }
  deleteItem(item: any) {
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
        this.Organizerservece.deleteorganizer(item.id).subscribe({
          next: (response) => {
            this.items = this.items.filter(i => i !== item);
            this.router.navigateByUrl('/trashorganizer');
  
          },
          error: (error) => {
            console.error('Error deleting item:', error);
          }
        });
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        Swal.fire('Cancelled', 'Your action has been cancelled', 'error');
      }
    });
  }
  navigateToUpdate(id: string) {
    this.router.navigate(['/updateorganizer', id]);  
  }
  
}
