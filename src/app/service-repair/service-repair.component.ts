// Title: employee-directory.component.ts
// Author: John Davidson
// Date: 2/28/2024
// Description: Service repair component file

import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import { InvoiceService } from '../invoice.service';
import { CookieService } from 'ngx-cookie-service';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-service-repair',
  templateUrl: './service-repair.component.html',
  styleUrls: ['./service-repair.component.css']
})
export class ServiceRepairComponent implements OnInit {
  message: string = ''; // Variable to hold messages for user interaction

  user: any; // Variable to hold user data

  lineItems = [
    { title: "RAM Upgrade", price: 89.99 },
    { title: "Password Reset", price: 29.99 },
    { title: "PC Rebuild", price: 149.99 },
    { title: "Diagnostic Test", price: 69.99 },
    { title: "PC Clean Up", price: 69.99 },
    { title: "PC Reset", price: 59.99 },
    { title: "Install OS", price: 39.99},
    { title: "Hardware Cleaning", price: 64.99}
  ]

  // Injecting services
  constructor(
    private userService: UserService,
    private invoiceService: InvoiceService,
    private cookieService: CookieService,
    private fb: FormBuilder) {}

  ngOnInit() {
    // Grab the signed in user data from the cookie
    const userId = this.cookieService.get('userId');
    this.userService.getUser(userId).subscribe(user => {
      this.user = user;
    });
  }

  // Reactive form for creating invoice
  invoiceForm = this.fb.group({
    ram: [false],
    password: [false],
    rebuild: [false],
    dtest: [false],
    softClean: [false],
    reset: [false],
    installOs: [false],
    hardwareClean: [false],
    parts: ['', Validators.pattern("^[0-9]*$")], // Input field for parts with numeric validation
    labor: ['', Validators.pattern("^[0-9]*$")] // Input field for labor with numeric validation
  })


  // Function to create invoice based on form data
  createInvoice(user: any) {
    if (this.invoiceForm.valid) {
      // If form is valid, call the invoice service to create invoice
      this.invoiceService.createInvoice(user).subscribe(response =>{
        console.log(response);
        this.message = 'Invoice Created'; // Set success message
        this.invoiceForm.reset(); // Reset form after successful submission
      }, error => {
        console.error(error);
        this.message = 'An error occurred while generating the invoice'; // Set error message
      });
    } else {
      this.message = 'Please select a service before submitting the form.' // Set error message for incomplete form
    }
  }

}
