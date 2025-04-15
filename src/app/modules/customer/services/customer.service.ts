import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { StorageService } from '../../../auth/services/storage/storage.service';

const BASIC_URL = "http://localhost:8080/api/customer";
const BASEURL ="http://localhost:8080/api";
@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  constructor(private http: HttpClient) { }

  getAllCars(): Observable<any>{
        return this.http.get(BASIC_URL + "/cars" ,{
        headers: this.createAuthorizationHeader()
      })
  }
  getCarById(carId: number): Observable<any>{
    return this.http.get(BASIC_URL + "/car/"+ carId,{
    headers: this.createAuthorizationHeader()
  })
}
bookACar(bookACarDto: any): Observable<any> {
  return this.http.post(BASIC_URL + "/car/book", bookACarDto, {
    headers: this.createAuthorizationHeader()
  });
}
getBookingsByUserId(): Observable<any>{
  return this.http.get(BASIC_URL + "/car/bookings/"+ StorageService.getUserId() ,{
  headers: this.createAuthorizationHeader()
})
}
searchCar(searchCarDto: any): Observable<any> {
  return this.http.post(BASIC_URL + "/car/search", searchCarDto, {
      headers: this.createAuthorizationHeader()
  });
}
createPayment(paymentData: any): Observable<any> {
  return this.http.post(BASEURL + "/payment/create", paymentData, {
    headers: this.createAuthorizationHeader()
  });
}

getPaymentsByUserId(): Observable<any> {
  const userId = StorageService.getUserId();
  return this.http.get(BASEURL + "/payment/"+ StorageService.getUserId(), {
    headers: this.createAuthorizationHeader()
  });
}

getPaymentById(paymentId: number): Observable<any> {
  return this.http.get(BASEURL + "/payment/"+ paymentId, {
    headers: this.createAuthorizationHeader()
  });
}
// **NEW** Method to get booking by ID
getBookingById(bookingId: string | null): Observable<any> {
  return this.http.get(BASIC_URL + "/car/bookings/" + bookingId, {
    headers: this.createAuthorizationHeader()
  });
}

// **NEW** Method to process payment
processPayment(bookingId: string | null): Observable<any> {
  return this.http.post(BASEURL + "/payment/process", { bookingId }, {
    headers: this.createAuthorizationHeader()
  });
}
    private createAuthorizationHeader(): HttpHeaders {
      const token = StorageService.getToken();  
      console.log("Token Sent:", token); 
    
      let headers = new HttpHeaders();
      if (token) {
        headers = headers.set('Authorization', `Bearer ${token}`);
      } else {
        console.error("No token found!");
      }
      return headers;
    }
}
