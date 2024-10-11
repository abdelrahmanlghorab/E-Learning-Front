import { Component } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatFormField } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import emailjs, { EmailJSResponseStatus } from 'emailjs-com';

@Component({
  selector: 'app-contact-us',
  standalone: true,
  imports: [MatFormField, MatIconModule, ReactiveFormsModule, CommonModule],
  templateUrl: './contact-us.component.html',
  styleUrls: ['./contact-us.component.css']
})
export class ContactUsComponent {
  emailForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.emailForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      message: ['', [Validators.required]]
    });
  }

  onSubmit() {
    if (this.emailForm.valid) {
      const formData = this.emailForm.value;
      console.log(formData);
  
     
      emailjs.send('service_0d1nvvm', 'template_uzegrj7', {
        from_name: formData.email, 
        message: formData.message 
      }, 'Rgd-zvajBrw3P6u5y')     
      .then((response: EmailJSResponseStatus) => {
        console.log(response.text);
        alert('Message sent successfully!');
      }, (error) => {
        console.log(error.text);
        alert('Failed to send message. Please try again.');
      });
    }
  }
  
}
