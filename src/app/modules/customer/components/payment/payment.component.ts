import { Component , OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CustomerService } from '../../services/customer.service';
import { CommonModule } from '@angular/common';
import { NgZorroImportsModule } from '../../../../ngZorroImportsModule';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzButtonModule } from 'ng-zorro-antd/button';
import {NzSpinModule} from 'ng-zorro-antd/spin';
import { NzMessageService } from 'ng-zorro-antd/message';


@Component({
  selector: 'app-payment',
  standalone: true,
  imports: [CommonModule,NzSpinModule, NzTableModule, NzButtonModule, NgZorroImportsModule],
  templateUrl: './payment.component.html',
  styleUrl: './payment.component.scss'
})
export class PaymentComponent implements OnInit {
  bookingId: string | null = null;
  paymentId!: number;
  bookingDetails: any = {}; // Store the booking details here
  paymentDetails: any = {}; // Store the payment details here
  isLoading = false;

  constructor(
    private route: ActivatedRoute,
    private customerService: CustomerService,
    private message: NzMessageService) {}

    ngOnInit(): void {
      this.route.paramMap.subscribe(params => {
        this.bookingId = params.get('bookingId');
        console.log('Received bookingId in PaymentComponent:', this.bookingId);  // <== this should show "1"
        if (this.bookingId) {
          this.getBookingDetails();  // Fetch booking details after receiving bookingId
        }
      });
    }

    fetchPaymentDetails(): void {
      if (!this.paymentId) {
        this.message.error('Payment ID is missing');
        return;
      }
  
      this.isLoading = true;
      this.customerService.getPaymentById(this.paymentId).subscribe(
        (data: any) => {
          console.log('Payment Data:', data);
          this.paymentDetails = data;
          this.isLoading = false;
        },
        (error: any) => {
          console.error('Error fetching payment details', error);
          this.isLoading = false;
          this.message.error('Error fetching payment details');
        }
      );
    }
    getBookingDetails() {
      this.isLoading = true;
      this.customerService.getBookingById(this.bookingId).subscribe(
        (res) => {
          if (res && Array.isArray(res) && res.length > 0) {
            this.bookingDetails = res;
          } else {
            console.log('No booking details found for this bookingId.');
            this.bookingDetails = []; // Empty array if no booking details found
          }
          this.isLoading = false;
        },
        (error) => {
          console.error('Error fetching booking details', error);
          this.isLoading = false;
        }
      );
    }
    
    processPayment() {
      if (this.bookingDetails) {
        // Call backend to process payment
        this.customerService.processPayment(this.bookingId).subscribe(
          (response: any) => {
            this.message.success('Payment successful!');
          },
          (error: any) => {
            this.message.error('Payment failed');
          }
        );
      }
    }
    initiatePayment(): void {
      if (!this.paymentId) {
        this.message.error('Payment ID is missing');
        return;
      }
      console.log('Initiating payment with ID:', this.paymentId);
      // Simulate redirect to payment gateway (replace with actual gateway URL)
      window.location.href = `https://payment-gateway.com/pay/${this.paymentId}`;
    }
}
