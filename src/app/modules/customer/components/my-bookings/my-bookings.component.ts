import { Component } from '@angular/core';
import { CustomerService } from '../../services/customer.service';
import { CommonModule } from '@angular/common';
import { NgZorroImportsModule } from '../../../../ngZorroImportsModule';
import { NzSpinModule } from 'ng-zorro-antd/spin';
import { NzTableModule } from 'ng-zorro-antd/table';
import { Router } from '@angular/router';

@Component({
  selector: 'app-my-bookings',
  standalone: true,
  imports: [CommonModule, NgZorroImportsModule, NzSpinModule,NzTableModule],
  templateUrl: './my-bookings.component.html',
  styleUrl: './my-bookings.component.scss'
})
export class MyBookingsComponent {

  bookings: any = [] ;
  isSpinning: boolean = false;
  bookedCars: any[] = [];

  constructor(private service: CustomerService, private router: Router) { 
    this.getMyBookings();
  } 
  getMyBookings() {
    this.isSpinning = true;
    this.service.getBookingsByUserId().subscribe((res) => {
      this.isSpinning = false;
      console.log('Bookings response:', res);
      this.bookings = res;
    })
  } 
  goToPayment(bookingId: number) {
    console.log('Booking ID:', bookingId);
    this.router.navigate([`/customer/payment/${bookingId}`]);
  }
}
