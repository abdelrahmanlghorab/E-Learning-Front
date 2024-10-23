import { Component } from '@angular/core';
import { CategoriesService } from '../../../services/categories.service';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css'],
  standalone: true,
  imports: [CommonModule,RouterLink]
})
export class CategoriesComponent {
  allCategories: any[] = [];

  constructor(private categories: CategoriesService) {
    this.categories.getAllCategories().subscribe((data: any) => {
      this.allCategories = data;
    });
  }

  getBackgroundColor(index: number): string {
    const colors = ['#f9b234', '#3ecd5e', '#e44002', '#952aff', '#cd3e94', '#4c49ea'];
    return colors[index % colors.length];
  }
  confirmDelete(categoryId: number) {
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
        this.categories.deleteCategory(categoryId).subscribe({
          next: (response) => {
            this.allCategories = this.allCategories.filter(category => category.id !== categoryId);
          },
          error: (error) => {
            alert('Failed to delete the category. Please try again.');
          }
        });
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        Swal.fire('Cancelled', 'Your action has been cancelled', 'error');
      }
    });
  }
}
