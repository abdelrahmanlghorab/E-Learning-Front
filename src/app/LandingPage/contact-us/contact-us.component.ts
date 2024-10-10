import { Component } from '@angular/core';
import { ReactiveFormsModule,FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { MatFormField} from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-contact-us',
  standalone: true,
  imports: [MatFormField,MatIconModule,ReactiveFormsModule,CommonModule],
  templateUrl: './contact-us.component.html',
  styleUrl: './contact-us.component.css'
})
export class ContactUsComponent {
  emailForm: FormGroup;
  constructor(private fb: FormBuilder, private http: HttpClient) {
    this.emailForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]]
    });
  }
  onSubmit() {
    if (this.emailForm.valid) {
      const formData = this.emailForm.value;
      console.log(formData);
      this.http.post('http://127.0.0.1:8000/api/subscribe', formData)
        .subscribe({
          next: (response) => {
            // Handle successful response
            alert('Subscription successful!');
          },
          error: (error) => {
            // Handle error response
            alert('Subscription failed. Please try again.');
          }
        });
    }
  }
}
