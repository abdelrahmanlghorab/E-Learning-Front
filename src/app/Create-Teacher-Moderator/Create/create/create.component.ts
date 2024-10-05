import { CreateOrganizerService } from './../../../services/create-organizer.service';
import { Component,OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-create',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule,RouterLink],
  templateUrl: './create.component.html',
  styleUrl: './create.component.css'
})
export class CreateComponent  implements OnInit {
  createForm: FormGroup;
  passwordFieldType: string = 'password';
  confirmPasswordFieldType: string = 'password';
  eyeIcon: string = 'fas fa-eye';
  confirmEyeIcon: string = 'fas fa-eye';

  constructor(private fb: FormBuilder ,private router :Router , private CreateOrganizer : CreateOrganizerService) {
    this.createForm = this.fb.group({
      name: ['', [Validators.required, Validators.pattern('^[a-zA-Zأ-ي\s]+$')]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [
        Validators.required,
        Validators.minLength(8),
        Validators.pattern('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*]).*')
      ]],
      password_confirmation: ['', Validators.required],
      national_id: ['', [Validators.required, Validators.pattern(/^[0-9]{14}$/)]],
      gender: ['', Validators.required],
      role_id: ['', Validators.required],
      address: ['', Validators.required],
      phone: ['', [Validators.required, Validators.pattern(/^[0-9]{11}$/)]],
      image: ['', Validators.required],

    }, { validators: this.passwordMatchValidator });
  }

  ngOnInit(): void {}

  passwordMatchValidator(formGroup: FormGroup) {
    return formGroup.get('password')?.value === formGroup.get('password_confirmation')?.value
      ? null : { passwordMismatch: true };
  }

  togglePasswordVisibility() {
    this.passwordFieldType = this.passwordFieldType === 'password' ? 'text' : 'password';
    this.eyeIcon = this.eyeIcon === 'fas fa-eye' ? 'fas fa-eye-slash' : 'fas fa-eye';
  }

  toggleConfirmPasswordVisibility() {
    this.confirmPasswordFieldType = this.confirmPasswordFieldType === 'password' ? 'text' : 'password';
    this.confirmEyeIcon = this.confirmEyeIcon === 'fas fa-eye' ? 'fas fa-eye-slash' : 'fas fa-eye';
  }

  onFileChange(event: any) {
    const file = event.target.files[0];
    if (file) {
      this.createForm.patchValue({
        image: file
      });
    }
  }
  onSubmit() {
    if (this.createForm.valid) {
      const formData = new FormData();

      formData.append('name', this.createForm.get('name')?.value);
      formData.append('email', this.createForm.get('email')?.value);
      formData.append('password', this.createForm.get('password')?.value);
      formData.append('password_confirmation', this.createForm.get('password_confirmation')?.value);
      formData.append('national_id', this.createForm.get('national_id')?.value);
      formData.append('gender', this.createForm.get('gender')?.value);
      formData.append('role_id', this.createForm.get('role_id')?.value);
      formData.append('address', this.createForm.get('address')?.value);
      formData.append('phone', this.createForm.get('phone')?.value);

      const imageFile = this.createForm.get('image')?.value as File;
      if (imageFile) {
        formData.append('image', imageFile);
      }
      this.CreateOrganizer.createorganizer(formData).subscribe((response) => {
        console.log('Organizer created successfully', response);
        console.log("تم إنشاء بنجاح", this.createForm.value);
        this.router.navigateByUrl('/allorganizer');


      }, (error) => {
        console.error('Error creating organizer', error);
      });

    } else {
      this.createForm.markAllAsTouched();
    }
  }

  get f() {
    return this.createForm.controls;
  }

}
