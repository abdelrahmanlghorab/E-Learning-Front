import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router'; // For route parameter
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { CategoriesService } from '../../../services/categories.service';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-category-edit',
  standalone: true,
  imports: [ReactiveFormsModule,CommonModule],
  templateUrl: './category-edit.component.html',
  styleUrl: './category-edit.component.css'
})
export class CategoryEditComponent {
  categoryForm: FormGroup;
  categoryId: number;
  successMessage: string | null = null;
  errorMessage: string | null = null;

  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    private route: ActivatedRoute,
    private router: Router,
    private toaster: ToastrService,
    private categories: CategoriesService
  ) {
    this.categoryForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(20)]],
      description: ['',Validators.minLength(10)],
    });
    this.categoryId = this.route.snapshot.params['id'];
  }

  ngOnInit() {
    this.categories.getCategory(this.categoryId).subscribe({
        next: (response: any) => {
          this.categoryForm.patchValue({
            name: response.name,
            description: response.description,
          });
        },
        error: (error) => {
          this.errorMessage = 'Failed to load category data.';
        },
      });
  }

  onSubmit() {
    if (this.categoryForm.valid) {
      const updatedCategoryData = this.categoryForm.value;
  this.categories.updateCategory( this.categoryId,updatedCategoryData)
        .subscribe({
          next: (response) => {
            this.successMessage = 'Category updated successfully!';
            this.router.navigate(['categories']);
            this.toaster.success(this.successMessage);
            this.errorMessage = null;
          },
          error: (error) => {
            this.errorMessage = 'Failed to update category. Please try again.';
            this.toaster.error(this.errorMessage);
            this.successMessage = null;
          },
        });
    }
  }
}
