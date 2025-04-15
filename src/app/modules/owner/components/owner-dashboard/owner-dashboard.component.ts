import { Component, NgModule } from '@angular/core';
import { OwnerService } from '../../services/owner.service';
import { elementAt } from 'rxjs';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NzMessageService } from 'ng-zorro-antd/message';
import { error } from 'console';
import { RouterModule } from '@angular/router';


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
  selector: 'app-owner-dashboard',
  standalone: true,
  imports: [FormsModule, CommonModule, RouterModule],
  templateUrl: './owner-dashboard.component.html',
  styleUrl: './owner-dashboard.component.scss'
})
export class OwnerDashboardComponent {
  cars: Car[] = []; // Declare the cars property as an array of Car

  constructor(private ownerService: OwnerService, private message: NzMessageService) { }

  ngOnInit() {
    this.getAllCars();
  }

  getAllCars() {
    this.ownerService.getAllCars().subscribe((res: Car[]) => {  // Define res type
      console.log(res);

      res.forEach((element: Car) => {  // Explicitly type element
        element.processedImg = 'data:image/jpeg;base64,' + element.returnedImage;
        this.cars.push(element);
      });
    });
  }
  deleteCar(id: number) {
    console.log(id);
    this.ownerService.deleteCar(id).subscribe((res) => {
      this.getAllCars();
      this.message.success('Car deleted successfully', { nzDuration: 5000 });
      this.cars = this.cars.filter(car => car.id !== id);
    }, (error) => {
      console.error('Error Deleting Car: ', error)
    }
    );
  }
}
