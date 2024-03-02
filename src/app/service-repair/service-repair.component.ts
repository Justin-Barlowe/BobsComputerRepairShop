// Title: service-repair.component.ts
// Author: John Davidson
// Date: 2/28/2024
// Description: Service repair component file

// import statements
import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import { InvoiceService } from '../invoice.service';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-service-repair',
  templateUrl: './service-repair.component.html',
  styleUrls: ['./service-repair.component.css']
})

// Export ServiceRepairComponent
export class ServiceRepairComponent implements OnInit {
  message: string = ''; // Variable to hold messages for user interaction
  total = 0; // Variable to hold the total amount of the invoice
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
    private router: Router,
    private fb: FormBuilder) {}

    ngOnInit() {
      // Grab the signed in user data from the cookie
      const userId = this.cookieService.get('userId');
      this.userService.getUser(userId).subscribe(user => {
        this.user = user;
      });

      Object.keys(this.invoiceForm.controls).forEach(key => {
        this.invoiceForm.get(key)?.valueChanges.subscribe(value => {
          this.message = '';
          this.updateTotal(); // Call updateTotal when the form value changes
        });
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
    labor: ['', Validators.pattern("^[0-9]*$")], // Input field for labor with numeric validation
    firstName: ['', Validators.required], // Input field for first name with required validation
    lastName: ['', Validators.required] // Input field for last name with required validation
  })

// Function to create invoice based on form data
createInvoice() {
  // Check if the form is valid
  if (this.invoiceForm && this.invoiceForm.valid) {
    // Get the selected services from the form
    const selectedServices = this.getSelectedServices();
    // Get the parts amount from the form, convert it to a number, or default to 0
    const partsAmount = Number(this.invoiceForm.get('parts')?.value) || 0;
    // Get the labor hours from the form, convert it to a number, multiply by 50, or default to 0
    const laborAmount = Number(this.invoiceForm.get('labor')?.value) * 50 || 0;
    // Calculate the total price of the selected services
    const lineItemTotal = selectedServices.reduce((total, item) => total + item.price, 0);
    // Calculate the total invoice amount and format it to 2 decimal places
    const total = (lineItemTotal + partsAmount + laborAmount).toFixed(2);

    // Create the invoice data object
    const invoiceData = {
      lineItems: selectedServices,
      partsAmount,
      laborAmount,
      lineItemTotal: lineItemTotal.toFixed(2),
      total,
      firstName: this.invoiceForm.get('firstName')?.value, // Get the customers first name from the form
      lastName: this.invoiceForm.get('lastName')?.value // Get the customers last name from the form
    };

    // Get the username
    const userName = this.user.userName;
    // Call the service to create the invoice
    this.invoiceService.createInvoice(userName, invoiceData).subscribe(response => {
      console.log(response);
      // Set the success message
      this.message = 'Invoice Created';
      this.invoiceService.setLastCreatedInvoice(response); // Store the invoice data
      this.router.navigate(['/invoice-summary']);
      // Reset the form
      this.invoiceForm.reset();
    }, error => {
      console.error(error);
      // Set the error message
      this.message = 'An error occurred while generating the invoice';
    });
  } else {
    // Set the error message if the form is not valid
    this.message = 'Please select a service before submitting the form.'
  }
}
  // Method to get the selected services from the form
  getSelectedServices() {
    // Check if the invoice form exists.
    if (this.invoiceForm) {
      // Filter the line items based on the form controls. If a form control's value is truthy,
      const selectedServices = this.lineItems
        .filter((item, index) => this.invoiceForm?.get(Object.keys(this.invoiceForm.controls)[index])?.value)
        // Map the filtered items to an object with only the title and price properties.
        .map(item => ({ title: item.title, price: item.price }));

      // Calculate the total price of the selected services.
      this.total = selectedServices.reduce((total, item) => total + item.price, 0);
      // Format the total to 2 decimal places.
      this.total = Number(this.total.toFixed(2));
      // Return the selected services.
      return selectedServices;
    }
    // If the invoice form does not exist, return an empty array.
    return [];
  }

// This method updates the total amount of the invoice for the front-end.
updateTotal() {
  // Get the selected services.
  const selectedServices = this.getSelectedServices();
  // Get the parts amount from the form, convert it to a number, or default to 0 if it's not a number.
  const partsAmount = Number(this.invoiceForm.get('parts')?.value) || 0;
  // Get the labor hours from the form, convert it to a number, multiply by 50, or default to 0 if it's not a number.
  const laborAmount = Number(this.invoiceForm.get('labor')?.value) * 50 || 0;
  // Calculate the total price of the selected services, parts, and labor.
  this.total = selectedServices.reduce((total, item) => total + item.price, 0) + partsAmount + laborAmount;
  // Format the total to 2 decimal places.
  this.total = Number(this.total.toFixed(2));
}

}