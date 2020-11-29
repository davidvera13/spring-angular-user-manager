import { Injectable } from '@angular/core';
import {environment} from '../../../environments/environment';
import {HttpClient, HttpErrorResponse, HttpEvent} from '@angular/common/http';
import {Observable} from 'rxjs';
import {User} from '../../models/User';
import {CustomHttpResponse} from '../../models/CustomHttpResponse';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private host: string = environment.apiUrl;

  constructor(private httpClient: HttpClient) { }
  public getUsers(): Observable<User[] | HttpErrorResponse> {
    return this.httpClient.get<User[]>(`${this.host}/users/list`);
  }

  public addUser(formData: FormData): Observable<User[] | HttpErrorResponse> {
    return this.httpClient.post<User[]>(`${this.host}/users/add`, formData);
  }

  public updateUser(formData: FormData): Observable<User[] | HttpErrorResponse> {
    return this.httpClient.post<User[]>(`${this.host}/users/update`, formData);
  }

  public resetPassword(email: string): Observable<CustomHttpResponse | HttpErrorResponse> {
    return this.httpClient.get<CustomHttpResponse>(`${this.host}/users/reset-password/${email}`);
  }

  public updateProfileImage(formData: FormData): Observable<HttpEvent<User>> {
    return this.httpClient.post<User>(
      `${this.host}/users/updateProfileImage`, formData,
      {reportProgress: true, observe: 'events'}
      );
  }

  public deleteUser(userId: number): Observable<CustomHttpResponse | HttpErrorResponse> {
    return this.httpClient.delete<CustomHttpResponse>(`${this.host}/users/${userId}`);
  }

  public addUserToLocalCache(users: User[]): void {
    localStorage.setItem('users', JSON.stringify(users));
  }

  public getUsersFromLocalCache(): User[] | null {
    if (localStorage.getItem('users')) {
      return JSON.parse(localStorage.getItem('users') as string);
    }
    return null;
  }

  public createUserFormData(loggedInUsername: string,
                            user: User,
                            profileImage: string): FormData {
    const formData = new FormData();
    formData.append('currentUsername', loggedInUsername);
    formData.append('firstName', user.firstName);
    formData.append('lastName', user.lastName);
    formData.append('username', user.username);
    formData.append('email', user.email);
    formData.append('roles', user.roles);
    formData.append('profileImage', profileImage);
    formData.append('isActive', JSON.stringify(user.isActive));
    formData.append('isNonLocked', JSON.stringify(user.isNotLocked));
    return formData;
  }

}
