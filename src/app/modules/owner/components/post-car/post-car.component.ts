import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { OwnerService } from '../../services/owner.service';
import { NzMessageService } from 'ng-zorro-antd/message';
import { Router } from '@angular/router';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NzSpinModule } from 'ng-zorro-antd/spin';

@Component({
  selector: 'app-post-car',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, NzFormModule, NzSelectModule, NzSpinModule],
  templateUrl: './post-car.component.html',
  styleUrls: ['./post-car.component.scss']
})
export class PostCarComponent {
  postCarForm!: FormGroup;
  isSpinning: boolean = false;
  selectedFile: File | null = null;
  imagePreview: string | ArrayBuffer | null = null;
  listOfBrands = ["BMW", "AUDI", "FERRARI", "TESLA", "VOLVO", "TOYOTA", "HONDA", "FORD", "NISSAN", "HYUNDAI", "LEXUS", "KIA"];
  listOfFuelTypes = ["Petrol", "Hybrid", "Diesel", "Electric", "CNG"];
  listOfColor = ["Red", "White", "Blue", "Black", "Orange", "Grey", "Silver"];
  listOfTransmission = ["Manual", "Automatic"];

  constructor(private fb: FormBuilder,
    private ownerService: OwnerService,
    private message: NzMessageService,
    private router: Router) { }

  ngOnInit(): void {
    this.postCarForm = this.fb.group({
      brand: ['', Validators.required],
      modelName: ['', Validators.required],
      fuelType: ['', Validators.required],
      transmission: ['', Validators.required],
      color: ['', Validators.required],
      modelYear: ['', Validators.required],
      rentalPrice: ['', Validators.required],
      carNumber: ['', Validators.required],
      capacity: ['', Validators.required]
    });
  }

  postCar() {
    console.log(this.postCarForm.value);
    this.isSpinning = true;
    const formData: FormData = new FormData();
    formData.append('brand', this.postCarForm.get('brand')?.value);
    formData.append('modelName', this.postCarForm.get('modelName')?.value);
    formData.append('fuelType', this.postCarForm.get('fuelType')?.value);
    formData.append('transmission', this.postCarForm.get('transmission')?.value);
    formData.append('color', this.postCarForm.get('color')?.value);
    formData.append('modelYear', this.postCarForm.get('modelYear')?.value);
    formData.append('rentalPrice', this.postCarForm.get('rentalPrice')?.value);
    formData.append('carNumber', this.postCarForm.get('carNumber')?.value);
    formData.append('capacity', this.postCarForm.get('capacity')?.value);
    if (this.selectedFile) {
      formData.append('image', this.selectedFile);
    } else {
      console.warn("No image selected.");
    }
    console.log(formData);
    this.ownerService.postCar(formData).subscribe(
      (res) => {
        this.isSpinning = false;
        this.message.success("Car Posted Successfully", { nzDuration: 5000 });
        this.router.navigateByUrl("/owner/dashboard");
        console.log(res);
      },
      (error) => {
        console.error(error);
        this.message.error("Error while posting car", { nzDuration: 5000 });
        window.location.reload();
      }
    );
  }

  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0];
    this.previewImage();
  }

  previewImage() {
    const reader = new FileReader();
    reader.onload = () => {
      this.imagePreview = reader.result;
    };
    if (this.selectedFile) {
      reader.readAsDataURL(this.selectedFile);
    }
  }
}