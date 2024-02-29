// Name: John Davidson, Justin Barlowe, Nolan Berryhill
// Date: 02/25/2024
// File: user.service.ts
// Description: This is the user service file

// Import statements
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

// @ Injectable of root
@Injectable({
  providedIn: 'root'
 })

export class InvoiceService {
  private apiUrl3 = '/api/invoice';

  constructor(private http: HttpClient) {}

  // Modify the method to not expect any arguments
  findPurchasesByService(): Observable<any> {
    return this.http.get<any>(this.apiUrl3);
  }
}