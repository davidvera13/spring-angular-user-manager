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
  private host: string = environment.apiUrl;
  private token!: string | null;
  private loggedUsername!: string;
  private jwtHelperService: JwtHelperService = new JwtHelperService();

  constructor(private httpClient: HttpClient) { }

  public login(user: User): Observable<HttpResponse<any> | HttpErrorResponse> {
    return this.httpClient
      .post<HttpResponse<any> | HttpErrorResponse>(
        `${this.host}/users/login`,
        user,
        { observe: 'response'});
  }

  public register(user: User): Observable<HttpResponse<any> | HttpErrorResponse> {
    return this.httpClient
      .post<HttpResponse<any> | HttpErrorResponse>(
        `${this.host}/users/register`,
        user,
        { observe: 'response'});
  }

  public logout(): void {
    this.token = null as any;
    this.loggedUsername = null as any;
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    localStorage.removeItem('users');
  }

  public saveToken(token: string): void {
    this.token = token;
    localStorage.setItem('token', token);
  }

  public addUserToLocalStorage(user: User): void {
    // localstorage accepts string, we convert object to string to store it
    localStorage.setItem('user', JSON.stringify(user));
  }

  public getUserFromLocalStorage(): User {
    return JSON.parse(localStorage.getItem('user') as string);
  }

  public loadToken(): void {
    this.token = localStorage.getItem('token');
  }

  public getToken(): string {
    return this.token as string;
  }

  public isLoggedIn(): boolean {
    if (this.token != null && this.token !== '') {
      if (this.jwtHelperService.decodeToken(this.token).sub != null || '')  {
        if (!this.jwtHelperService.isTokenExpired(this.token)) {
          this.loggedUsername = this.jwtHelperService.decodeToken(this.token).sub;
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
