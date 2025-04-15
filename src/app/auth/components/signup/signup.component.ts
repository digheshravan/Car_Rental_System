import { Component, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../services/auth/auth.service';
import { NzMessageService } from 'ng-zorro-antd/message';
import { Router } from '@angular/router';
import { provideHttpClient } from '@angular/common/http';

@Component({
  selector: 'app-sign-up',
  imports: [ReactiveFormsModule,CommonModule],
  providers: [],
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class SignUpComponent {
  isSpinning: boolean = false;
  signupForm!: FormGroup;

  constructor(private fb: FormBuilder,
    private authService: AuthService ,
    private message:NzMessageService,
    private router:Router ){ }

  ngOnInit()  {
    this.signupForm = this.fb.group({
      email: [null,[Validators.required, Validators.email]],
      name: [null,[Validators.required, Validators.minLength(3), Validators.maxLength(20)]],
      phoneNumber : [null,[Validators.required, Validators.pattern('^[0-9]{10}$')]],
      password: [null,[Validators.required, Validators.minLength(6), Validators.maxLength(20)]],
      confirmPassword: [null,[Validators.required, this.confirmationValidate]],
      userRole:[null,[Validators.required]],
    })
  }

  confirmationValidate = (control: FormControl): { [s: string]: boolean } => {
    if(!control.value){
      return { required : true };
    }else if(control.value !== this.signupForm.controls['password'].value){
      return { confirm: true, error: true };
    }
    return {};
  };

  register() {
    if (this.signupForm.invalid) {
      this.message.error("Please fill in all required fields correctly!", { nzDuration: 3000 });
      return;
    }
  
    if (this.signupForm.value.password !== this.signupForm.value.confirmPassword) {
      this.message.error("Passwords do not match!", { nzDuration: 3000 });
      return;
    }
    
    const selectedRole = this.signupForm.value.userRole;
    console.log("✅ Selected Role:", selectedRole);
    const formData = { ...this.signupForm.value, userRole: selectedRole };
  
    console.log("🔍 Sending Form Data:", this.signupForm.value); // ✅ Debugging
  
    this.authService.register(this.signupForm.value).subscribe(
      (res) => {
        console.log("✅ Signup Success:", res);
        if(res.id != null){
          this.message.success('SignUp successful!',{nzDuration: 5000});
          this.router.navigateByUrl("/login");
        }else{
          this.message.error('SignUp failed!',{nzDuration: 5000});
        }
        this.signupForm.reset();
      },
      (error) => {
        console.error("❌ Signup Error:", error);
        alert("Signup Failed: " + error.error);
      }
    );
}
}