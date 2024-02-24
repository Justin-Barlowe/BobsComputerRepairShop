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
  private apiUrl2 = '/api/security'

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

  // Register user
  registerUser(user: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl2}/register`, user);
  }

  // verifySecurityQuestions function
  // Define a method to fetch user by email
  verifySecurityQuestions(email: string, securityAnswers: { question: string, answer: string }[]): Observable<any> {
    return this.http.post(`/api/users/${email}/security-questions`, { securityQuestions: securityAnswers });
  }

  // resetPassword function
  // Define a method to update user password
  resetPassword(email: string, password: string): Observable<any> {
    return this.http.post(`/api/security/${email}/reset-password`, { password });
  }

  // verifyEmail function
  // Define a method to check on user email
  verifyUser(email: any): Observable<any> {
    return this.http.get(`${this.apiUrl2}/register/${email}`);
  }

  findSelectedSecurityQuestions(email: string, securityQuestions: any[]): Observable<any> {
    return this.http.post(`${this.apiUrl}/${email}/security-questions`, { securityQuestions });
  }

  fetchSecurityQuestions(): Observable<any[]> {
    return this.http.get<any[]>('/api/security-questions');
  }

}