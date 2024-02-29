// Title: employee-directory.component.ts
// Author: John Davidson
// Date: 2/28/2024
// Description: Service repair component file

import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import { InvoiceService } from '../invoice.service';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-service-repair',
  templateUrl: './service-repair.component.html',
  styleUrls: ['./service-repair.component.css']
})
export class ServiceRepairComponent implements OnInit {

  user: any;
  constructor(private userService: UserService, private invoiceService: InvoiceService, private cookieService: CookieService) {}

  ngOnInit() {
    const userId = this.cookieService.get('userId');
    this.userService.getUser(userId).subscribe(user => {
      this.user = user;
    });
  }
}
