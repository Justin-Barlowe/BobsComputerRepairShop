//Name: Justin Barlowe
//Date: 03/01/2024
//Description: This is the view-invoices component file
//File: view-invoices.component.ts

import { Component, OnInit } from '@angular/core';
import { InvoiceService } from '../invoice.service';
import { ChangeDetectorRef } from '@angular/core';

@Component({
  selector: 'app-view-invoices',
  templateUrl: './view-invoices.component.html',
  styleUrls: ['./view-invoices.component.css'],
})
export class ViewInvoicesComponent implements OnInit {
  invoices: any[] = []; // Array to hold invoice data
  filteredInvoices: any[] = []; // Array to hold filtered invoice data
  message: string = ''; // Variable to hold message displayed to user
  employeeSearch: string = ''; // Variable to hold employee search text
  customerSearch: string = ''; // Variable to hold customer search text
  statusSearch: string = ''; // Variable to hold status search text
  payStatusSearch: string = ''; // Variable to hold pay status search text

  // Constructor with injected InvoiceService
  constructor(private invoiceService: InvoiceService, private cdr: ChangeDetectorRef) { }

  // Function to update invoice status
  updateStatus(invoiceId: string, status: string, payStatus: string) {
    this.invoiceService.updateInvoiceStatus(invoiceId, status, payStatus).subscribe({
      next: (response) => {
        this.message = 'Invoice status updated successfully!';
      },
      error: (err) => {
        console.error('Error updating invoice status:', err);
        this.message = 'Error updating invoice status. Please try again later.';
      }
    });
  }

  // Function to filter invoices based on search text
  filterInvoices() {
    this.filteredInvoices = this.invoices.filter(invoice =>
      (!this.employeeSearch || invoice.userName.toLowerCase().includes(this.employeeSearch.toLowerCase())) &&
      (!this.customerSearch || (invoice.firstName + ' ' + invoice.lastName).toLowerCase().includes(this.customerSearch.toLowerCase())) &&
      (!this.payStatusSearch || invoice.payStatus.toLowerCase().includes(this.payStatusSearch.toLowerCase())) &&
      (!this.statusSearch || invoice.status.toLowerCase().includes(this.statusSearch.toLowerCase()))
    );
  }

  // ngOnInit lifecycle hook to get invoices from the invoice service
  ngOnInit() {
    this.invoiceService.getAllInvoices().subscribe((response: any) => {
      this.invoices = response.data;
      this.filteredInvoices = [...this.invoices];
    });
  }
}