import { Injectable } from '@angular/core';
import { environment} from '../../../environments/environment';
import {HttpClient, HttpErrorResponse, HttpResponse} from '@angular/common/http';
import {Observable} from 'rxjs';
import {User} from '../../models/User';
import {JwtHelperService} from '@auth0/angular-jwt';


@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  public host = environment.apiUrl;
  private token!: string | null;
  private loggedUsername!: string;
  private jwtHelper: JwtHelperService = new JwtHelperService();

  constructor(private httpClient: HttpClient) { }

  public login(user: User): Observable<HttpResponse<User>> {
    return this.httpClient.post<User>(`${this.host}/users/login`, user, { observe: 'response' });
  }

  public register(user: User): Observable<User> {
    return this.httpClient.post<User>(`${this.host}/users/register`, user);
  }

  public logout(): void {
    // tslint:disable-next-line:no-unused-expression
    this.token = '';
    this.loggedUsername = '';
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    localStorage.removeItem('users');
  }

  public saveToken(token: string | null): void {
    this.token = token;
    if (token != null) {
      localStorage.setItem('token', token);
    }
  }

  public addUserToLocalStorage(user: User | null): void {
    // localstorage accepts string, we convert object to string to store it
    localStorage.setItem('user', JSON.stringify(user));
  }

  public getUserFromLocalStorage(): User {
    return JSON.parse(localStorage.getItem('user') as string);
  }

  public loadToken(): void {
    this.token = (localStorage.getItem('token') as string);
  }

  public getToken(): string {
    return this.token as string;
  }

  public isUserLoggedIn(): boolean {
    this.loadToken();
    if (this.token != null && this.token !== ''){
      if (this.jwtHelper.decodeToken(this.token).sub != null || '') {
        if (!this.jwtHelper.isTokenExpired(this.token)) {
          this.loggedUsername = this.jwtHelper.decodeToken(this.token).sub;
          return true;
        }
      }
    } else {
      this.logout();
      return false;
    }
    return false;
  }
}
