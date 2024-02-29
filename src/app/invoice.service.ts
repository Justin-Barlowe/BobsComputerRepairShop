import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

// Export InvoiceService
export class InvoiceService {

  private apiUrl3 = '/api/invoice'

  constructor(private http: HttpClient) { }

  createInvoice(user: any): Observable<any> {
    return this.http.post<any>(this.apiUrl3, user);
  }

  findPurchasesByService(): Observable<any> {
    return this.http.get<any>(this.apiUrl3);
  }
}
