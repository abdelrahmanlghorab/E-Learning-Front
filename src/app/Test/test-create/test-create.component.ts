import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { TestService } from '../../services/test.service';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-test-create',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, RouterLink],
  templateUrl: './test-create.component.html',
  styleUrl: './test-create.component.css'
})
export class TestCreateComponent {
  CreateForm: FormGroup;

  constructor(private fb: FormBuilder, private testService: TestService, private router: Router) {
    this.CreateForm = this.fb.group({
      title: ['', Validators.required],
      description: ['', Validators.required],
      is_free: ['', Validators.required],
      excel_file: ['', Validators.required]


    });
  }
  onFileChange(event: any) {
    const file = event.target.files[0];
    if (file) {
      this.CreateForm.patchValue({
        excel_file: file
      });
    }
  }

  onSubmit() {
    if (this.CreateForm.valid) {
      const formData = new FormData();
      formData.append('title', this.CreateForm.get('title')?.value);
      formData.append('description', this.CreateForm.get('description')?.value);
      formData.append('is_free', this.CreateForm.get('is_free')?.value);

      const csvFile = this.CreateForm.get('excel_file')?.value as File;
      if (csvFile) {
        formData.append('excel_file', csvFile);
      }

      formData.append('excel_file', this.CreateForm.get('excel_file')?.value);
      console.log(formData);
      
      this.testService.createTest(formData).subscribe(
        (response) => {
          console.log('Create successful', response);
          this.router.navigateByUrl('/tests');
        },
        (error) => {
          console.error('Create failed', error);
        }
      );
    } else {
      this.CreateForm.markAllAsTouched();
    }

  }

  get f() {
    return this.CreateForm.controls;
  }

}
