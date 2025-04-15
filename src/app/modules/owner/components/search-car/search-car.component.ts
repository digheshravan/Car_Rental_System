import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { NzSpinModule } from 'ng-zorro-antd/spin';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NgZorroImportsModule } from '../../../../ngZorroImportsModule';
import { ReactiveFormsModule } from '@angular/forms';
import { OwnerService } from '../../services/owner.service';

interface Car {
  id: number;
  brand: string;
  modelName: string;
  fuelType: string;
  transmission: string;
  color: string;
  modelYear: string;  // Keeping modelYear as a string as per your requirement
  rentalPrice: number;
  carNumber: string;
  capacity: number;
  returnedImage: string; // Base64 string
  processedImg?: string; // Processed image URL
}

@Component({
  selector: 'app-search-car',
  imports: [NgZorroImportsModule, CommonModule, NzSelectModule, NzSpinModule, ReactiveFormsModule],
  templateUrl: './search-car.component.html',
  styleUrl: './search-car.component.scss'
})
export class SearchCarComponent {

  searchCarFrom!: FormGroup;
  isSpinning: boolean = false;
  listOfOption: Array<{ label: string; value: string }> = [];
  listOfBrands = ["BMW", "AUDI", "FERRARI", "TESLA", "VOLVO", "TOYOTA", "HONDA", "FORD", "NISSAN", "HYUNDAI", "LEXUS", "KIA"];
  listOfFuelTypes = ["Petrol", "Hybrid", "Diesel", "Electric", "CNG"];
  listOfColor = ["Red", "White", "Blue", "Black", "Orange", "Grey", "Silver"];
  listOfTransmission = ["Manual", "Automatic"];
  cars: Car[] = [];

  constructor(private fb: FormBuilder, private service: OwnerService) {
    this.searchCarFrom = this.fb.group({
      brand: [''],
      fuelType: [''],
      transmission: [''],
      color: [''],
    })

  }
  searchCar() {
    this.isSpinning = true;
    this.service.searchCar(this.searchCarFrom.value).subscribe((res) => {
      res.carDtoList.forEach((element: Car) => {
        element.processedImg = 'data:image/jpeg;base64,' + element.returnedImage;
        this.cars.push(element);
      });
      this.isSpinning = false;
    })
  }
}
