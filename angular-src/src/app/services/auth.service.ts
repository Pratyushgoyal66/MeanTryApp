import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import { JwtHelperService } from '@auth0/angular-jwt';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';

import { ObserveOnOperator } from 'rxjs/internal/operators/observeOn';

@Injectable({
  providedIn: 'root'
})



export class AuthService {

  authToken: any;
  user: any;


  constructor(
    private http: HttpClient
    ) {   }

  registerUser(user){
    let headers = new HttpHeaders({'Content-Type': 'application/json'});
    
    
    return this.http.post<any>(
      "http://localhost:5000/users/register",
      user,
      {headers: headers}
    ).pipe(map(res => res));

  }

  authenticateUser(user){
    let headers = new HttpHeaders({'Content-Type': 'application/json'});
    
    
    return this.http.post<any>(
      "http://localhost:5000/users/authenticate",
      user,
      {headers: headers}
    ).pipe(map(res => res));
  }

  storeUserData(token, user){
    localStorage.setItem('id_token', token);
    localStorage.setItem('user', JSON.stringify(user));
    this.authToken = token;
    this.user = user;
  }

  logout(){
    this.authToken = null;
    this.user = null;
    localStorage.clear();
  }

  getProfile(){
    this.loadToken();
    let headers = new HttpHeaders({'Authorization':this.authToken, 'Content-Type': 'application/json'});
    return this.http.get<any>(
      "http://localhost:5000/users/profile",
      {headers: headers}
    ).pipe(map(res => res));

  }

  loadToken(){
    const token = localStorage.getItem('id_token');
    this.authToken = token;
  }

  loggedIn(){
    this.loadToken();
    const helper = new JwtHelperService();
    return !helper.isTokenExpired(this.authToken); //False if Token is good, True if not good
}

}
