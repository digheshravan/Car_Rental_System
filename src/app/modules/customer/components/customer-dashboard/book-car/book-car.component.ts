import { Component } from '@angular/core';
import { CustomerService } from '../../../services/customer.service';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { NgZorroImportsModule } from '../../../../../ngZorroImportsModule';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { FormGroup, Validators } from '@angular/forms';
import { NzDateMode } from 'ng-zorro-antd/date-picker';
import { StorageService } from '../../../../../auth/services/storage/storage.service';
import { NzMessageService } from 'ng-zorro-antd/message';
import { Router } from '@angular/router';
import { error } from 'console';


@Component({
  selector: 'app-book-car',
  imports: [CommonModule, NgZorroImportsModule,ReactiveFormsModule],
  templateUrl: './book-car.component.html',
  styleUrl: './book-car.component.scss'
})
export class BookCarComponent {

  carId!: number;
  car:any;
  processedImage: any;  
  validateForm!: FormGroup;
  isSpinning = false;
  dateFormat = 'yyyy-MM-dd';

  constructor(private service: CustomerService,
    private activatedRoute: ActivatedRoute,
    private fb: FormBuilder,
    private message: NzMessageService,
    private router: Router) { 
  }
  ngOnInit(): void {
    this.carId = this.activatedRoute.snapshot.params['id'];  
    this.validateForm = this.fb.group({
      toDate: ['', Validators.required],
      fromDate: ['', Validators.required],
    });
    this.getCarById();
  }
  getCarById(){
    this.service.getCarById(this.carId).subscribe((res) =>{
      console.log(res);
      this.processedImage = 'data:image/jpeg;base64,' + res.returnedImage;
      this.car = res;
    })
  }
  bookACar(data: any){
    console.log(data);
    this.isSpinning = true;
    let bookACarDto = {
      toDate: data.toDate,
      fromDate: data.fromDate,
      userId:StorageService.getUserId(),
      carId: this.carId
    }
    this.service.bookACar(bookACarDto).subscribe((res) => {
      console.log(res);
      this.message.success("Booking request submitted successfully!", { nzDuration: 5000 });
      this.router.navigateByUrl("/customer/dashboard");
    }, error => {
      this.message.error("Something went wrong", { nzDuration: 5000 });
    })
  }
}
