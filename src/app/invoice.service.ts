// Title: invoice.service.ts
// Author: John Davidson
// Date: 3/01/2024
// Description: Invoice service file

// Import statements
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

// Export InvoiceService
export class InvoiceService {

  // apiUrl variable
  private apiUrl3 = '/api/invoice';

  constructor(private http: HttpClient) { }

  // createInvoice function - will create an invoice
  createInvoice(userName: string, invoiceData: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl3}/${userName}`, invoiceData);
  }
// findPurchasesByService function - will collect all services purchased in the lineItems array
  findPurchasesByService(): Observable<any> {
    return this.http.get<any>(this.apiUrl3);
  }
}
