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
    role_id:'',
    image:''
  };

  id: any ;
  selectedFile: File | null = null;
  currentImageUrl: string = '';

  constructor(private fb: FormBuilder , private Organizerservece : CreateOrganizerService , private route: ActivatedRoute) {
    this.updateForm = this.fb.group({
      name: ['', [Validators.required, Validators.pattern('^[a-zA-Zأ-ي\s]+$')]],
      email: ['', [Validators.required, Validators.email]],
      national_id: ['', [Validators.required, Validators.pattern(/^[0-9]{14}$/)]],
      gender: [''],
      address : [''],
      phone : [''],
      role_id: ['']
    });


  }
  ngOnInit(): void {
    
    this.id = this.route.snapshot.paramMap.get('id') || '';
    this.Organizerservece.getorganizer(Number(this.id)).subscribe((data: any) => {
      this.updateForm.patchValue({
        name: data.data.name,
        email: data.data.email,
        national_id: data.data.national_id,
        gender: data.data.gender,
        address: data.data.address,
        phone: data.data.phone,
        role_id: data.data.role_id,
      });
      if(this.updateForm.value.role_id == 2 ){
        this.updateForm.patchValue({
          role_id: 'Teacher',
        });
      }else{
        this.updateForm.patchValue({
          role_id: 'Moderator',
        });
      }
      
      this.currentImageUrl = data.data.image; 
      console.log(this.updateForm.value);
    });
  }



onFileChange(event: any) {
    const file = event.target.files[0];
    if (file) {
      console.log('Selected file:', file);
      this.updateForm.patchValue({
        image: file
      });
    }
  }

    onSubmit() {
      if (this.updateForm.invalid) {
        console.log('Form is invalid');
        return;
      }
      this.Organizerservece.updateorganizer(this.id,this.updateForm.value).subscribe(
        (response: any) => {
          console.log('Organizer updated successfully', response);
          alert('Organizer updated successfully!');
        },
        (error: any) => {
          console.error('Error updating organizer', error);
          alert('Error updating organizer.');
        }
      );
    }
    
  
  

  

  get f() {
    return this.updateForm.controls;
  }

}
