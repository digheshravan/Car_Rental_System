import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CustomerDashboardComponent } from './components/customer-dashboard/customer-dashboard.component';
import { BookCarComponent } from './components/customer-dashboard/book-car/book-car.component';
import { MyBookingsComponent } from './components/my-bookings/my-bookings.component';
import { SearchCarComponent } from './components/search-car/search-car.component';
import { PaymentComponent } from './components/payment/payment.component';

const routes: Routes = [
  {path: "dashboard", component: CustomerDashboardComponent },
  {path: "book/:id", component: BookCarComponent },
  {path: "my_bookings", component: MyBookingsComponent },
  {path: "car/search", component: SearchCarComponent },
  {path: "payment/:bookingId", component: PaymentComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CustomerRoutingModule { }
