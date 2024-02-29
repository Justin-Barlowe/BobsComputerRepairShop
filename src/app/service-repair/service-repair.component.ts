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
  message: string = '';

  user: any;
  constructor(
    private userService: UserService,
    private invoiceService: InvoiceService,
    private cookieService: CookieService,
    private fb: FormBuilder) {}

  ngOnInit() {
    const userId = this.cookieService.get('userId');
    this.userService.getUser(userId).subscribe(user => {
      this.user = user;
    });
  }

  invoiceForm = this.fb.group({
    ram: [false],
    password: [false],
    rebuild: [false],
    dtest: [false],
    softClean: [false],
    reset: [false],
    installOs: [false],
    hardwareClean: [false],
    parts: ['', Validators.pattern("^[0-9]*$")],
    labor: ['', Validators.pattern("^[0-9]*$")]
  })

  createInvoice(user: any) {
    if (this.invoiceForm.valid) {
      this.invoiceService.createInvoice(user).subscribe(response =>{
        console.log(response);
        this.message = 'Invoice Created';
        this.invoiceForm.reset();
      }, error => {
        console.error(error);
        this.message = 'An error occurred while generating the invoice';
      });
    } else {
      this.message = 'Please select a service before submitting the form.'
    }
  }

}
