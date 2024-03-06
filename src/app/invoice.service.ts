// Title: invoice.service.ts
// Author: John Davidson
// Date: 3/01/2024
// Description: Invoice service file

// Import statements
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})

// Export InvoiceService
export class InvoiceService {
  // apiUrl variable
  private apiUrl3 = '/api/invoice';
  private lastCreatedInvoice = new BehaviorSubject<any>(null);

  constructor(private http: HttpClient) {}

  // createInvoice function - will create an invoice
  createInvoice(userName: string, invoiceData: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl3}/${userName}`, invoiceData);
  }

  // findPurchasesByService function - will collect all services purchased in the lineItems array
  findPurchasesByService(): Observable<any> {
    return this.http.get<any>(this.apiUrl3);
  }

  // setLastCreatedInvoice function - will set the last created invoice
  setLastCreatedInvoice(invoiceData: any) {
    this.lastCreatedInvoice.next(invoiceData);
  }

  // getLastCreatedInvoice function - will get the last created invoice
  getLastCreatedInvoice() {
    return this.lastCreatedInvoice.asObservable();
  }

  // Get invoices function
  getAllInvoices(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl3}/all`);
  }

  //Update invoice status function.
  updateInvoiceStatus(invoiceId: string, status: string, payStatus: string): Observable<any> {
    return this.http.put<any>(`${this.apiUrl3}/${invoiceId}`, { status, payStatus });
  }

  // Find invoice by first and last name function.
  searchInvoices(firstName: string, lastName: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl3}/search`, { params: { firstName, lastName } });
  }

}
