import { Component } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-forget-password',
  standalone: true,
  imports: [CommonModule,ReactiveFormsModule ],
  templateUrl: './forget-password.component.html',
  styleUrl: './forget-password.component.css'
})
export class ForgetPasswordComponent {
  signInForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.signInForm = this.fb.group({
      studentEmail: ['', [Validators.required, Validators.email]],  
    });
  }
  onSubmit() {
    if (this.signInForm.valid) {
      console.log('Form Submitted', this.signInForm.value);
    } else {
      this.signInForm.markAllAsTouched(); 
    }
  }

  get formControls() {
    return this.signInForm.controls;
  }
}
