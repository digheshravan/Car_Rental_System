import { Routes, RouterModule } from '@angular/router';
import { SignUpComponent } from './auth/components/signup/signup.component';
import { LoginComponent } from './auth/components/login/login.component';
import { AppComponent } from './app.component';
import { NgModule } from '@angular/core';
import path from 'path';
import { PostCarComponent } from './modules/owner/components/post-car/post-car.component';
import { OwnerDashboardComponent } from './modules/owner/components/owner-dashboard/owner-dashboard.component';

export const routes: Routes = [
    { path: '', component: AppComponent },
    { path: 'register', component: SignUpComponent },
    { path: 'login', component: LoginComponent },
    { path: 'admin', loadChildren : () => import("./modules/admin/admin.module").then(m => m.AdminModule)},
    { path: 'customer', loadChildren : () => import("./modules/customer/customer.module").then(m => m.CustomerModule)},
    { path: 'owner', loadChildren : () => import("./modules/owner/owner.module").then(m => m.OwnerModule)},
    
];
@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }