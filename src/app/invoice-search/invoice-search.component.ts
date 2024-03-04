// Name: Justin Barlowe
// Date: 03/04/2024
// Description: This is the invoice search component file. This file will allow the user to search for invoices by first and last name.
// File: invoice-search.component.ts

import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { InvoiceService } from '../invoice.service';

@Component({
  selector: 'app-invoice-search',
  templateUrl: './invoice-search.component.html',
  styleUrls: ['./invoice-search.component.css']
})
export class InvoiceSearchComponent implements OnInit {
  invoiceSearchForm!: FormGroup;
  searchResults: any[] = [];
  errorMessage: string | null = null;

  // constructor
  constructor(private fb: FormBuilder, private invoiceService: InvoiceService) { }

  // ngOnInit
  ngOnInit(): void {
    this.invoiceSearchForm = this.fb.group({
      firstName: [''],
      lastName: ['']
    });
  }

  // searchInvoices function to search invoices by first and last name.
  searchInvoices(): void {
    const { firstName, lastName } = this.invoiceSearchForm.value;
    this.invoiceService.searchInvoices(firstName, lastName).subscribe(
      data => {
        if (data && data.data.length > 0) {
          this.searchResults = data.data;
          this.errorMessage = null;  // Reset error message
        } else {
          this.errorMessage = 'No invoices found for the given name.';  // Set error message
          this.searchResults = [];  // Clear previous results
        }
      },
      error => {
        console.error('There was an error!', error);
        this.errorMessage = 'No invoices found. Please try again.';
      }
    );
  }
}

