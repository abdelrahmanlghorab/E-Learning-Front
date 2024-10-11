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
  subscriptionForm: FormGroup;
  emails: string = '';
  message: string = '';
  submitted:boolean=false;

  constructor(private fb: FormBuilder, private http: HttpClient) {
    this.subscriptionForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]]
    });
  }

  subscribe() {
    this.submitted = true;
    const email = this.subscriptionForm.get('email')?.value;
    this.http.post('http://localhost:8000/api/subscribe', { email })
      .subscribe({
        next: (response) => {
          alert('Subscription successful!');
        },
        error: (error) => {
          console.error('Subscription failed:', error);
        }
      });

  }
  sendContactMessage() {
    const contactData = {
      email: this.emails,
      message: this.message,
    };

    this.http.post('http://localhost:8000/api/contact', contactData)
      .subscribe(response => {
        console.log('Message sent successfully', response);
      }, error => {
        console.error('Error sending message', error);
      });
  }

}
