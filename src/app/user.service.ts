// Name: Justin Barlowe
// Date: 02/15/2024
// File: user.service.ts
// Description: This is the user service file


import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
 providedIn: 'root'
})
export class UserService {

  // apiUrl variable
  private apiUrl = '/api/users'

  constructor(private http: HttpClient) { }

  // getUsers function
  // This function will return an observable of the users
  getUsers(): Observable<any> {
    return this.http.get<any>(this.apiUrl);
  }

  // getUser function
  // This function will return an observable of the user with the given id
  getUser(id: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${id}`);
  }

  // createUser function
  // This function will return an observable of the user that was created
  createUser(user: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, user);
  }

  // updateUser function
  // This function will return an observable of the user that was updated
  updateUser(id: string, user: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/${id}`, user);
  }

  // deleteUser function
  // This function will return an observable of the user that was deleted
  deleteUser(id: string): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/${id}`);
  }
}