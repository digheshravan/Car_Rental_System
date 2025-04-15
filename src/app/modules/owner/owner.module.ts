import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OwnerRoutingModule } from './owner-routing.module';
import { PostCarComponent } from './components/post-car/post-car.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgZorroImportsModule } from '../../ngZorroImportsModule';
import { OwnerDashboardComponent } from './components/owner-dashboard/owner-dashboard.component';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    OwnerRoutingModule,
    PostCarComponent,
    ReactiveFormsModule,
    FormsModule,
    NgZorroImportsModule,
    OwnerDashboardComponent,
    CommonModule
  ]
})
export class OwnerModule { }
