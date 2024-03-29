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

  // Cancel the edit mode
  cancelEdit() {
    this.user = { ...this.originalUser };  // restore the original user data
    this.isEditing = false;
  }

  // Get the user's last logged in date
  getLastLoggedIn() {
    if (this.user && this.user.lastLoggedIn) {
      const date = new Date(this.user.lastLoggedIn);
      return `${date.getMonth() + 1}/${date.getDate()}/${date.getFullYear()} ${date.getHours()}:${date.getMinutes()}`;
    }
    return 'N/A';
  }

  selectedFile: File | null = null;

  onFileSelected(event: any) {
    if (event.target.files.length > 0) {
      this.selectedFile = event.target.files[0];
    }
  }

  // Upload the user's profile picture
  onUploadButtonClicked() {
    if (this.selectedFile) {
      this.userService.uploadProfilePicture(this.user._id, this.selectedFile).subscribe(response => {
        console.log(response);
        // Update the user's profile picture and show a success message
        this.user.profilePicture = response.profilePicture;
        this.message = 'Profile picture uploaded successfully!';
      }, error => {
        // Show an error message
        console.error(error);
        this.message = error.error.error;
      });
    }
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