import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

const BASE_URL="http://localhost:8080";
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:8080/api/auth/login';

  constructor(private http: HttpClient) { }

  register(signupRequest: any): Observable<any>{
    const headers = new HttpHeaders({
      'Content-Type': 'application/json' // ✅ Ensures correct format
    });
    console.log("Sending Data:", signupRequest);
    console.log("📤 Sending Request to Backend:", JSON.stringify(signupRequest));
    return this.http.post(`${BASE_URL}/api/auth/signup`, JSON.stringify(signupRequest), { headers });

  }
  login(credentials: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, credentials);
  }
  
}
