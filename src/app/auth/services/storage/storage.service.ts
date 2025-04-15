import { Injectable } from '@angular/core';

const TOKEN ="token";
const USER = "user";


@Injectable({
  providedIn: 'root'
})
export class StorageService {
  private static USER_KEY = 'auth-user';
  private static TOKEN_KEY = 'auth-token';

  constructor() { }  

  saveToken(token: string): void {
    if (typeof window !== 'undefined') {
      localStorage.setItem('token', token);
    }
    console.log("✅ Token saved:", localStorage.getItem(TOKEN));
  }
  saveUser(user: any): void {
    if (typeof window !== 'undefined') {
      localStorage.setItem('user', JSON.stringify(user));
    }
    console.log("✅ User saved:", localStorage.getItem(USER));
  }
  static getToken():string | null {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('token');
    }
    return null;
  }
  static getUser(): any{
    return JSON.parse(localStorage.getItem(USER) || '{}');
  }
  static getUserRole(): string {
    const user = this.getUser();
    if(user ==  null) return "";
    return user.role;
  }
  static isAdminLoggedIn():boolean{
    if(this.getToken() ==  null) return false;
    const role :string = this.getUserRole();
    return role == "ADMIN";
  }
  static isCustomerLoggedIn():boolean{
    if(this.getToken() ==  null) return false;
    const role :string = this.getUserRole();
    return role == "CUSTOMER";
  }
  static getUserId(): string {
    const user = this.getUser();
    if(user ==  null) {return "";}
    return user.id;
  }
  static isOwnerLoggedIn():boolean{
    if(this.getToken() ==  null) return false;
    const role :string = this.getUserRole();
    return role == "OWNER";
  }
  static logout(): void {
    window.localStorage.removeItem(TOKEN);
    window.localStorage.removeItem(USER);
  }
}
