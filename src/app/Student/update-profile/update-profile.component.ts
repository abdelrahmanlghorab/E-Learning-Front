import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { UserService } from '../../services/user.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-update-profile',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './update-profile.component.html',
  styleUrls: ['./update-profile.component.css']
})
export class UpdateProfileComponent {
  updateForm: FormGroup;
  passwordFieldType: string = 'password';
  confirmPasswordFieldType: string = 'password';
  eyeIcon: string = 'fas fa-eye';
  confirmEyeIcon: string = 'fas fa-eye';

  userData = {
    name: '',
    email: '',
    national_id: '',
    gender: '',
    address: '',
    phone: '',
    role_id: '',
    image: ''
  };

  id: any;
  selectedFile: File | null = null;
  currentImageUrl: string = '';

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private userService: UserService
  ) {
    this.updateForm = this.fb.group({
      name: ['', [Validators.required, Validators.pattern('^[a-zA-Zأ-ي\\s]+$')]],
      email: ['', [Validators.required, Validators.email]],
      national_id: ['', [Validators.required, Validators.pattern(/^[0-9]{14}$/)]],
      gender: [''],
      address: [''],
      phone: [''],
      role_id: [''],
      password: ['', [Validators.minLength(6)]],
      password_confirmation: ['', [Validators.minLength(6)]],
    });
  }

  // ngOnInit(): void {
  //   this.id = this.route.snapshot.paramMap.get('id') || '';
  //   this.userService.getUser(Number(this.id)).subscribe((data: any) => {
  //     this.updateForm.patchValue({
  //       name: data.data.name,
  //       email: data.data.email,
  //       national_id: data.data.national_id,
  //       gender: data.data.gender,
  //       address: data.data.address,
  //       phone: data.data.phone,
  //       role_id: data.data.role_id,
  //     });
  //     this.currentImageUrl = data.data.image;
  //   });
  // }

  // togglePasswordVisibility() {
  //   if (this.passwordFieldType === 'password') {
  //     this.passwordFieldType = 'text';
  //     this.eyeIcon = 'fas fa-eye-slash';
  //   } else {
  //     this.passwordFieldType = 'password';
  //     this.eyeIcon = 'fas fa-eye';
  //   }
  // }

  // toggleConfirmPasswordVisibility() {
  //   if (this.confirmPasswordFieldType === 'password') {
  //     this.confirmPasswordFieldType = 'text';
  //     this.confirmEyeIcon = 'fas fa-eye-slash';
  //   } else {
  //     this.confirmPasswordFieldType = 'password';
  //     this.confirmEyeIcon = 'fas fa-eye';
  //   }
  // }

  // onFileChange(event: any) {
  //   const file = event.target.files[0];
  //   if (file) {
  //     this.updateForm.patchValue({
  //       image: file
  //     });
  //   }
  // }

  // onSubmit() {
  //   if (this.updateForm.invalid) {
  //     console.log('Form is invalid');
  //     return;
  //   }

  //   const formData = new FormData();
  //   for (const key in this.updateForm.value) {
  //     if (this.updateForm.value.hasOwnProperty(key)) {
  //       formData.append(key, this.updateForm.value[key]);
  //     }
  //   }

  //   this.userService.updateUser(this.id, formData).subscribe(
  //     (response: any) => {
  //       console.log('User updated successfully', response);
  //       alert('User updated successfully!');
  //       this.router.navigateByUrl('/allusers');
  //     },
  //     (error: any) => {
  //       console.error('Error updating user', error);
  //       alert('Error updating user.');
  //     }
  //   );
  // }

  // get f() {
  //   return this.updateForm.controls;
  // }
}
