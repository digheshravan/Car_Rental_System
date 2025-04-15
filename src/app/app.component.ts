import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { Router } from '@angular/router';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { StorageService } from './auth/services/storage/storage.service';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterModule, NzLayoutModule, CommonModule], // ✅ Import RouterModule here
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  showLayout = true;
  
  constructor(private router : Router) {
    this.router.events.subscribe(() => {
      this.showLayout = this.router.url !== '/login';
    });
  }
  isCustomerLoggedIn:boolean=StorageService.isCustomerLoggedIn();
  isAdminLoggedIn:boolean=StorageService.isAdminLoggedIn();
  isOwnerLoggedIn:boolean=StorageService.isOwnerLoggedIn();

  ngOnInit(){
    this.router.events.subscribe(event => {
      if(event.constructor.name === "NavigationEnd"){
        this.isAdminLoggedIn = StorageService.isAdminLoggedIn();
        this.isCustomerLoggedIn = StorageService.isCustomerLoggedIn();
        this.isOwnerLoggedIn = StorageService.isOwnerLoggedIn();
      }
    })
  }
  logout(){
    StorageService.logout();
    this.router.navigateByUrl("/login");
  }
}
