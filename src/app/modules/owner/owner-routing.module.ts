import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { OwnerDashboardComponent } from './components/owner-dashboard/owner-dashboard.component';
import { combineLatest } from 'rxjs';
import { PostCarComponent } from './components/post-car/post-car.component';
import { GetBookingsComponent } from './components/get-bookings/get-bookings.component';
import { SearchCarComponent } from './components/search-car/search-car.component';


const routes: Routes = [
  {path: 'dashboard', component: OwnerDashboardComponent },
  {path: 'car', component: PostCarComponent},
  {path: 'bookings', component: GetBookingsComponent},
  {path: 'search', component: SearchCarComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OwnerRoutingModule { }
