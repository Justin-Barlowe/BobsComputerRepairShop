// Name: Justin Barlowe, John Davidson, Nolan Berryhill
// Date: 2/17/2024
// File: view-users.component.ts
// Description: View users component file

// Import Statements
import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import { User } from '../user';
import { HttpClient } from '@angular/common/http';

// Component of selector, templateUrl, styleUrls
@Component({
  selector: 'app-view-users',
  templateUrl: './view-users.component.html',
  styleUrls: ['./view-users.component.css']
})

// Export ViewUsersComponent
export class ViewUsersComponent implements OnInit {
  users: User[] = []; // Array to hold user data.
  message: string = ''; // Variable to hold message displayed to user.

  constructor(private userService: UserService, private http: HttpClient) { }

  // ngOnInit method to get the users from the user service
  ngOnInit() {
    this.userService.getUsers().subscribe(users => {
      this.users = users;
    });
  }

  // DeleteUser function
  deleteUser(id: string) {
    // If user confirms deletion, carry out with deleting selected user.
    if (confirm('Are you sure you want to delete this user?')) {
      // Call the deleteUser method of the userService to delete user.
      this.userService.deleteUser(id).subscribe(() => {
        // Remove the deleted user from the users array.
        this.users = this.users.filter(user => user._id !== id);
        // Set the message to indicate successful deletion.
        this.message = 'User deleted successfully!';
      },
      // If there's an error during deletion, log the error and set an error message.
      error => {
        console.error(error)
        this.message = 'Error deleting user.'
      });
    }
  }

  editUser(user: User) {
    // Toggle edit mode for the user
    user.isEditMode = true;
  }

  saveUser(user: User) {
    // Save user changes
    this.userService.updateUser(user._id, user).subscribe(() => {
      user.isEditMode = false; // Exit edit mode
      // Optionally, you can show a success message
      this.message = 'User updated successfully!';
    }, error => {
      console.error(error);
      // Optionally, you can show an error message
      this.message = 'Error updating user.';
    });
  }

  cancelEdit(user: User) {
    // Cancel edit mode
    user.isEditMode = false;
  }

}