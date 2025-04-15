import { Component } from '@angular/core';
import { CustomerService } from '../../services/customer.service';
import { CommonModule } from '@angular/common';
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
  selector: 'app-customer-dashboard',
  imports: [CommonModule,RouterModule],
  templateUrl: './customer-dashboard.component.html',
  styleUrl: './customer-dashboard.component.scss'
})


export class CustomerDashboardComponent {
  cars: any = [] ;

  constructor(private service: CustomerService) { }

  ngOnInit() {
    this.getAllCars();
  }

  getAllCars() {
    this.service.getAllCars().subscribe((res: Car[]) => {  // Define res type
      console.log(res);
      res.forEach((element: Car) => {  // Explicitly type element
        element.processedImg = 'data:image/jpeg;base64,' + element.returnedImage;
        this.cars.push(element);
      });
    });
  }
}
