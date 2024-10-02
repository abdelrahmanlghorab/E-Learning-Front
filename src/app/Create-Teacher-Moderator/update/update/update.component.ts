import { Component,OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { CreateOrganizerService } from '../../../services/create-organizer.service';
@Component({
  selector: 'app-update',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule,RouterLink],
  templateUrl: './update.component.html',
  styleUrl: './update.component.css'
})
export class UpdateComponent {
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
    image: ['']
  };

  id: any ;

  constructor(private fb: FormBuilder , private Organizerservece : CreateOrganizerService , private route: ActivatedRoute) {
    this.updateForm = this.fb.group({
      name: ['', [Validators.required, Validators.pattern('^[a-zA-Zأ-ي\s]+$')]],
      email: ['', [Validators.required, Validators.email]],
      national_id: ['', [Validators.required, Validators.pattern(/^[0-9]{14}$/)]],
      gender: ['', Validators.required],
      address : [''],
      phone : [''],
      image: ['', Validators.required],
      role_id: ['2']
    });


  }
  ngOnInit(): void {
    this.id =this.route.snapshot.paramMap.get('id') || '';
    this.Organizerservece.getorganizer(Number(this.id)).subscribe((data : any) => {
      this.updateForm.patchValue(data.data); 
      console.log(this.updateForm.value);
      
    });
  }

  onFileChange(event: any) {
    const file = event.target.files[0];
    if (file) {
      console.log('File selected:', file);
      this.updateForm.patchValue({
        image: file
      });
    }
  }

  onSubmit() {
    if (this.updateForm.valid) {
      const formData = new FormData();
      formData.append('name', this.updateForm.get('name')?.value);
      formData.append('email', this.updateForm.get('email')?.value);
      formData.append('national_id', this.updateForm.get('national_id')?.value);
      formData.append('gender', this.updateForm.get('gender')?.value);
      formData.append('address', this.updateForm.get('address')?.value);
      formData.append('phone', this.updateForm.get('phone')?.value);
      formData.append('role_id', this.updateForm.get('role_id')?.value);
  
      const imageFile = this.updateForm.get('image')?.value;
      if (imageFile instanceof File) {
        formData.append('image', imageFile);
      } else {
        alert('Please select a valid image file.');
        return;
      }
  
      console.log('FormData before sending:');
      formData.forEach((value, key) => {
        console.log(key, value);
      });
  
      this.Organizerservece.updateorganizer(Number(this.id), formData).subscribe(
        (response: any) => {
          console.log('User updated successfully:', response);
          alert('User updated successfully!');
        },
        (error) => {
          console.error('Error updating user:', error);
          alert('Failed to update user.');
        }
      );
    } else {
      alert('Please fill out the form correctly.');
      console.log('Form Invalid:', this.updateForm);
    }
  }
  

  get f() {
    return this.updateForm.controls;
  }

}
