import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ViewEncapsulation } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth/auth.service';
import { StorageService } from '../../services/storage/storage.service';
import { error } from 'console';
import { NzMessageService } from 'ng-zorro-antd/message';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class LoginComponent {
  isSpinnerVisible: boolean = false;
  loginForm!: FormGroup;

  constructor(private fb: FormBuilder,
    private authService: AuthService,
    private storageService: StorageService,
    private router: Router,
    private message: NzMessageService) { }

  ngOnInit() {
    this.loginForm = this.fb.group({
      email: [null, [Validators.required, Validators.email]],
      password: [null, [Validators.required]],
    });
  }
  login() {
    console.log("🔹 Calling login API with:", this.loginForm.value);
    this.authService.login(this.loginForm.value).subscribe((res) => {
      console.log("✅ Login API Response:", res);
      if (res.userId != null) {
        const user = {
          id: res.userId,
          role: res.userRole,
        };
        console.log("📌 Saving user:", user);
        console.log("📌 Saving token:", res.jwt);

        this.storageService.saveUser(user);
        this.storageService.saveToken(res.jwt);

        switch (res.userRole) {
          case 'ADMIN':
            this.router.navigateByUrl("/admin/dashboard");
            this.message.success('Logged in as Admin', { nzDuration: 3000 });
            break;
          case 'CUSTOMER':
            this.router.navigateByUrl("/customer/dashboard");
            this.message.success('Logged in as Customer', { nzDuration: 3000 });
            break;
          case 'OWNER':
            this.router.navigateByUrl("/owner/dashboard");
            this.message.success('Logged in as Owner', { nzDuration: 3000 });
            break;
          default:
            this.message.error('Invalid Credentials', { nzDuration: 3000 });
        }
      }
    });
  }
}
