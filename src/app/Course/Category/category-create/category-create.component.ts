import { Component } from '@angular/core';
import { ReactiveFormsModule,FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { CategoriesService } from '../../../services/categories.service';
import { ToastrService } from 'ngx-toastr';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';


@Component({
  selector: 'app-category-create',
  standalone: true,
  imports: [ReactiveFormsModule,CommonModule],
  templateUrl: './category-create.component.html',
  styleUrl: './category-create.component.css'
})
export class CategoryCreateComponent {
  categoryForm: FormGroup;
  successMessage: string | null = null;
  errorMessage: string | null = null;

  constructor(private router: Router,private fb: FormBuilder, private http: HttpClient, private categories: CategoriesService , private toaster: ToastrService) {
    this.categoryForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(20)]],
      description: ['', Validators.minLength(10)],
      image:['']
    });
  }

  onSubmit() {
    if (this.categoryForm.valid) {
      const formData = this.categoryForm.value;

      this.categories.createCategory(formData).subscribe({
          next: (response) => {
            this.successMessage = 'Category created successfully!';
            this.router.navigate(['categories']);
            this.toaster.success(this.successMessage);
            this.errorMessage = null;
            this.categoryForm.reset();

          },
          error: (error) => {
            this.errorMessage = 'Failed to create category. Please try again.';
            this.toaster.error(this.errorMessage);
            this.successMessage = null;
          }
        });
    }
  }
}
