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

  // Variables
  user: any;
  isEditing = false;
  originalUser: any;
  message: string = ''; // Initialize the 'message' property

  constructor(private userService: UserService, private cookieService: CookieService) { }

  // Get the user's information
  ngOnInit() {
    const userId = this.cookieService.get('userId');
    this.userService.getUser(userId).subscribe(user => {
      this.user = user;
      this.originalUser = { ...user };
    });
  }

  // Toggle the edit mode
  toggleEdit() {
    if (this.isEditing) {
      this.saveProfile();
    } else {
      this.originalUser = { ...this.user };  // save the current user data before entering edit mode
    }
    this.isEditing = !this.isEditing;
  }

  cancelEdit() {
    this.user = { ...this.originalUser };  // restore the original user data
    this.isEditing = false;
  }

  // Save the user's profile
  saveProfile() {
    this.userService.updateUser(this.user._id, this.user).subscribe(() => {
      this.message = 'Profile saved';
    }, error => {
      this.message = 'Profile save failed';
    });
  }
}