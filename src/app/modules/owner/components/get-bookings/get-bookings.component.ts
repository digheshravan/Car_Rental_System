import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { OwnerService } from '../../services/owner.service';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzSpinModule } from 'ng-zorro-antd/spin';
import { ReactiveFormsModule } from '@angular/forms';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NzMessageService } from 'ng-zorro-antd/message';

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
  selector: 'app-get-bookings',
  imports: [CommonModule, NzTableModule, NzSpinModule, ReactiveFormsModule, NzFormModule, NzSelectModule],
  templateUrl: './get-bookings.component.html',
  styleUrl: './get-bookings.component.scss'
})
export class GetBookingsComponent {

  bookings: any[] = [];
  isSpinning: boolean = false;

  constructor(private OwnerService: OwnerService, private message: NzMessageService) {
    this.getBookings();
  }

  getBookings() {
    this.isSpinning = true;
    this.OwnerService.getCarBookings().subscribe((res) => {
      this.isSpinning = false;
      this.bookings = res;
  
      // Convert byte[] image to Base64 URL for each booking
      this.bookings.forEach((booking: any) => {
        if (booking.returnedImage) {
          booking.processedImg = 'data:image/jpeg;base64,' + booking.returnedImage;
        }
      });
    }, (error) => {
      this.isSpinning = false;
      this.message.error("Failed to fetch bookings");
    });
  }
  
  changeBookingStatus(bookingId: number, status: string) {
    this.isSpinning = true;
    console.log(bookingId, status);
    this.OwnerService.changeBookingStatus(bookingId, status).subscribe((res) => {
      this.isSpinning = false;
      console.log(res);
      this.getBookings();
      this.message.success("Booking Status Changed Successfully!", { nzDuration: 5000 });
    },
      (error) => {
        this.message.success("Something went wrong!", { nzDuration: 5000 });
      });
  }

}
