import { Component } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { MatFormField } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { Toast, ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-contact-us',
  standalone: true,
  imports: [MatFormField, MatIconModule, ReactiveFormsModule, CommonModule],
  templateUrl: './contact-us.component.html',
  styleUrl: './contact-us.component.css'
})

export class ContactUsComponent {
  subscriptionForm: FormGroup;
  contactForm: FormGroup;
  submitted = false;
  response:any;

  constructor(private fb: FormBuilder, private http: HttpClient, private toaster: ToastrService) {
    this.subscriptionForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]]
    });

    this.contactForm = this.fb.group({
      contactEmail: ['', [Validators.required, Validators.email]],
      message: ['', [Validators.required, Validators.minLength(10)]]
    });
  }

  subscribe() {
    this.submitted = true;
    const email = this.subscriptionForm.get('email')?.value;

    this.http.post('http://localhost:8000/api/subscribe', { email })
      .subscribe({
        next: (data) => {
          this.response=data;
          this.toaster.success(this.response.message)
        },
        error: (error) => {
          this.toaster.error(error.error.message);
        }
      });
  }
  sendContactMessage() {
    const contactData = {
      email: this.contactForm.get('contactEmail')?.value,
      message: this.contactForm.get('message')?.value
    };

    this.http.post('http://localhost:8000/api/contact', contactData)
      .subscribe({
        next: (data) => {
          this.response = data;
          this.toaster.success(this.response.message)
          this.contactForm.reset();
          let modal = document.getElementById('exampleModal');
          const closeModalBtn = document.getElementById('closeModalBtn');
          closeModalBtn?.click();
        },
        error: (error) => {
          this.toaster.error(error.error.message);
        }
      });

  }

}
