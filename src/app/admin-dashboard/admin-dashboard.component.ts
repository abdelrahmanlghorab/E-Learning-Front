import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { PaymentService } from '../services/payment.service';

@Component({
  selector: 'app-admin-dashboard',
  standalone: true,
  imports: [CommonModule, RouterLink ,MatPaginatorModule,MatTableModule],
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.css'],
})
export class AdminDashboardComponent implements OnInit {
  isCollapsed = false;
  data: any;
  name!: string;
  image!: string;
  role_id!: any;
  id!: any;
  payments: any;
  dataSource!: MatTableDataSource<any>; 
  displayedColumns: string[] = ['id', 'amount', 'date', 'status']; 
  @ViewChild(MatPaginator) paginator!: MatPaginator; 
  
  constructor(private paymentService: PaymentService) {}

  trackByPaymentId(index: number, payment: any): number {
    return payment.id;
  }
  ngOnInit() {
    this.data = localStorage.getItem('data');
    if (this.data) {
      this.data = JSON.parse(this.data);
      this.name = this.data.name;
      this.image = this.data.image;
      this.role_id = this.data.role_id;
      this.id = this.data.id;
      console.log(this.role_id);
      
    }
    this.paymentService.getPayments().subscribe(
      (response: any) => {
        this.payments = response.payments;
        console.log(this.payments);
        this.dataSource = new MatTableDataSource(this.payments); 
        this.dataSource.paginator = this.paginator; 
      },
      (error: any) => {
        console.error('Error fetching payments', error);
      }
    );
  }

  toggleSidebar() {
    this.isCollapsed = !this.isCollapsed;
  }
}
