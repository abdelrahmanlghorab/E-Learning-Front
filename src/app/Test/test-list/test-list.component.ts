import { HttpClient } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import { TestService } from '../../services/test.service';
import { RouterLink } from '@angular/router';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-test-list',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './test-list.component.html',
  styleUrl: './test-list.component.css'
})
export class TestListComponent {
  testList: any[] = [];
  data: any;
  role_id:any ;
  score: any;
  http = inject(HttpClient);
  testServices = inject(TestService)
  constructor() {

  }
  ngOnInit() {
    
    this.data = localStorage.getItem('data');
    if (this.data) {
      this.data = JSON.parse(this.data);
      this.role_id = this.data.role_id; 
    
    }
    this.index();
    
  }
  index() {
    this.testServices.allTests().subscribe((res: any) => {
      this.testList = res.data;
      console.log(this.testList);
    });
  }
  onDelete(id: number) {
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
        this.testServices.deleteTest(id).subscribe((res: any) => {
          this.index();
        });
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        Swal.fire('Cancelled', 'Your action has been cancelled', 'error');
      }
    });
  }
}
