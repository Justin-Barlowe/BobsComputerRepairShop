// Name: Justin Barlowe
// Date: 02/26/2024
// Description: My profile page
// File: my-profile.component.ts


// Imports
import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-my-profile',
  templateUrl: './my-profile.component.html',
  styleUrls: ['./my-profile.component.css']
})
export class MyProfileComponent implements OnInit {
  user: any;


  constructor(private userService: UserService, private cookieService: CookieService) { }

  // Get the user's information
  ngOnInit() {
    const userId = this.cookieService.get('userId');
    this.userService.getUser(userId).subscribe(user => {
      this.user = user;
    });
  }

  // Save the user's profile
  saveProfile() {
    this.userService.updateUser(this.user._id, this.user).subscribe(() => {
      // handle success
    }, error => {
      // handle error
    });
  }
}