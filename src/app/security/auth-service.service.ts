// Name: Justin Barlowe
// Date: 2/13/2024
// File: auth.service.ts
// Description: Auth service  file


import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private _isSignedIn: BehaviorSubject<boolean>;

  constructor() {
    const isSignedIn = localStorage.getItem('isSignedIn') === 'true';
    this._isSignedIn = new BehaviorSubject(isSignedIn);
  }

  get isSignedIn$() {
    return this._isSignedIn.asObservable();
  }

  setSignedIn(isSignedIn: boolean) {
    localStorage.setItem('isSignedIn', String(isSignedIn));
    this._isSignedIn.next(isSignedIn);
  }

}