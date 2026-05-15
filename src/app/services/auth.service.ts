import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {jwtDecode} from 'jwt-decode';
import {Router} from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  isAuthenticated: boolean = false;
  roles: string[] = [];
  username: string | undefined;
  accessToken!: string;



  constructor(private http: HttpClient, private router: Router) { }

  login(username: string, password: string) {
    const headers = new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded'
    });
    let params = new HttpParams().set("username", username).set("password", password).toString();
    return this.http.post(`${environment.apiUrl}/auth/login`, params, { headers })
  }

  loadProfile(data: any) {
    this.isAuthenticated = true;
    this.accessToken = data['token'];
    let decodedJwt:any = jwtDecode(this.accessToken!);
    this.username = decodedJwt.sub;
    this.roles = decodedJwt.scope;
    window.localStorage.setItem("jwtToken", this.accessToken);
  }

  logout() {
    this.isAuthenticated = false;
    this.accessToken = "";
    this.username = undefined;
    window.localStorage.removeItem("jwtToken");
    this.roles = [];
    this.router.navigateByUrl("/login")
  }

  loadJwtTokenFromLocalStorage() {
    let token = window.localStorage.getItem("jwtToken");
    if (token){
      this.loadProfile({"token" : token});
      this.router.navigateByUrl("/admin/customers");
    }
  }
}
