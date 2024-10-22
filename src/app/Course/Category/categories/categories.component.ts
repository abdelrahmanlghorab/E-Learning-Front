import { Component } from '@angular/core';
import { CategoriesService } from '../../../services/categories.service';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

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
    // Fetch categories from the service
    this.categories.getAllCategories().subscribe((data: any) => {
      this.allCategories = data;
    });
  }

  // Function to dynamically assign background colors based on the index
  getBackgroundColor(index: number): string {
    const colors = ['#f9b234', '#3ecd5e', '#e44002', '#952aff', '#cd3e94', '#4c49ea'];
    return colors[index % colors.length];
  }
  confirmDelete(categoryId: number) {
    if (confirm('Are you sure you want to delete this category?')) {
      this.categories.deleteCategory(categoryId).subscribe({
        next: (response) => {
          alert('Category deleted successfully!');
          this.allCategories = this.allCategories.filter(category => category.id !== categoryId);
        },
        error: (error) => {
          alert('Failed to delete the category. Please try again.');
        }
      });
    }
  }
}
