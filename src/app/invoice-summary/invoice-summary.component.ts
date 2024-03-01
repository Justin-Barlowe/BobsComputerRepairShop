// Name: Justin Barlowe
// Date: 03/01/2024
// Description: Invoice summary component file
// File: invoice-summary.component.ts


import { Component, ChangeDetectorRef, OnDestroy, OnInit } from '@angular/core';
import { jsPDF } from 'jspdf';
import { Subscription } from 'rxjs';
import { InvoiceService } from '../invoice.service';


@Component({
  selector: 'app-invoice-summary',
  templateUrl: './invoice-summary.component.html',
  styleUrls: ['./invoice-summary.component.css']
})
export class InvoiceSummaryComponent implements OnInit, OnDestroy {

  invoice: any; // Property to hold the invoice data
  private invoiceSubscription!: Subscription; // Subscription to manage the observable for invoice data

  // Constructor to inject the InvoiceService
  constructor(private invoiceService: InvoiceService) {  }

  // ngOnInit lifecycle hook to perform component initialization and data fetching
  ngOnInit() {
    // Subscribe to the invoiceService to get the last created invoice data
    this.invoiceSubscription = this.invoiceService.getLastCreatedInvoice().subscribe(invoiceData => {
      if (invoiceData && invoiceData.data) { // Check if the invoiceData and its nested data property exist
        this.invoice = invoiceData.data; // Assign the nested data to the invoice property
        console.log('Invoice data structured received:', this.invoice);
      } else {
        console.warn('No detailed invoice data available'); // Log a warning if no data is available
      }
    });
  }

// Method to generate a PDF invoice summary
generatePDF() {
  const doc = new jsPDF(); // Create a new jsPDF instance

  // Add header to the PDF
  doc.setFontSize(20);
  doc.text('Bobs Computer Repair Shop', 10, 10);
  doc.setFontSize(12);
  doc.text(`Invoice Date: ${new Date().toLocaleDateString()}`, 10, 20);

  // Add customer's name to the PDF
  doc.text(`Customer Name: ${this.invoice.firstName} ${this.invoice.lastName}`, 10, 30);

  // Loop through line items in the invoice to add them to the PDF
  let yPos = 40; // Initial Y position for line items
  this.invoice.lineItems.forEach((item: any, index: number) => {
    doc.text(`${index + 1}. ${item.title}: $${item.price}`, 10, yPos);
    yPos += 10; // Increment Y position for each new line item
  });

  // Add parts amount, labor amount, and total to the PDF
  doc.text(`Parts Amount: $${this.invoice.partsAmount}`, 10, yPos + 10);
  doc.text(`Labor Amount: $${this.invoice.laborAmount}`, 10, yPos + 20);
  doc.setFontSize(14);
  doc.text(`Total: $${this.invoice.total}`, 10, yPos + 30);

  // Add footer to the PDF
  doc.setFontSize(10);
  doc.text(`Page 1 of 1`, 10, doc.internal.pageSize.height - 10);

  // Save the generated PDF with a filename
  doc.save('InvoiceSummary.pdf');
}

// ngOnDestroy lifecycle hook to clean up the subscription when the component is destroyed
ngOnDestroy() {
  this.invoiceSubscription.unsubscribe(); // Unsubscribe to prevent memory leaks
}

}