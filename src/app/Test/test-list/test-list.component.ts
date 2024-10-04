import { HttpClient } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import { TestService } from '../../services/test.service';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-test-list',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './test-list.component.html',
  styleUrl: './test-list.component.css'
})
export class TestListComponent {
  testList: any[] = [];
  http = inject(HttpClient);
  constructor() {

  }
  ngOnInit() {
    this.index();
  }
  testServices = inject(TestService)
  index() {
    this.testServices.allTests().subscribe((res: any) => {
      this.testList = res.data;
    });
  }
  onDelete(id:number) {
    if (confirm('Are you sure you want to delete this test?')) {
      this.testServices.deleteTest(id).subscribe((res: any) => {
        console.log(res);
        this.index();
      });
    }
  }
}
