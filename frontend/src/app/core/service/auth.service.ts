import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UserCredentials } from 'src/app/model/users/user-credentials.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private loginURL = '/login';
  private logoutURL = '/logout';

  constructor(private http: HttpClient) { }

  login(requestData: UserCredentials) {
    return this.http.post(this.loginURL, requestData);
  }

  logout() {
    this.http.get(this.logoutURL);
  }

}
