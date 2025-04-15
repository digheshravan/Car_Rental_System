import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { StorageService } from '../../../auth/services/storage/storage.service';

const BASIC_URL = "http://localhost:8080";

@Injectable({
  providedIn: 'root'
})
export class OwnerService {
  constructor(private http: HttpClient, private storageService: StorageService ) {}

  postCar(carDto: any): Observable<any> {
    return this.http.post(BASIC_URL + "/api/owner/car", carDto, {
        headers: this.createAuthorizationHeader()
    });
  }

  getAllCars(): Observable<any>{
      return this.http.get(BASIC_URL + "/api/owner/cars" ,{
      headers: this.createAuthorizationHeader()
    })
  }

  deleteCar(id:number):Observable<any>{
    return this.http.delete(BASIC_URL + "/api/owner/car/" + id,{
      headers: this.createAuthorizationHeader()
    })
  }

  getCarById(id: number): Observable<any>{
    return this.http.get(BASIC_URL + "/api/owner/car/" + id,{
      headers: this.createAuthorizationHeader()
  });
}
getCarBookings(): Observable<any>{
  return this.http.get(BASIC_URL + "/api/owner/car/booking" ,{
  headers: this.createAuthorizationHeader()
})
}
changeBookingStatus(bookingId: number, status: string): Observable<any> {
  return this.http.get(`${BASIC_URL}/api/owner/car/booking/${bookingId}/${status}`, {
    headers: this.createAuthorizationHeader()
  });
}
searchCar(searchCarDto: any): Observable<any> {
  return this.http.post(BASIC_URL + "/api/owner/car/search", searchCarDto, {
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
