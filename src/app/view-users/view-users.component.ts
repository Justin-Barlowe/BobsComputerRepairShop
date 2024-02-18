// Name: Justin Barlowe, John Davidson, Nolan Berryhill
// Date: 2/17/2024
// File: view-users.component.ts
// Description: View users component file

// Import Statements
import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import { User } from '../user'; // Assuming this is the path to your User model
import { set } from 'mongoose';

// Extend the User model for component-specific properties
interface EditableUser extends User {
  isEditMode?: boolean; // Optional property to manage edit mode in the UI
}

// Component Decorator with selector, templateUrl, and styleUrls
@Component({
  selector: 'app-view-users',
  templateUrl: './view-users.component.html',
  styleUrls: ['./view-users.component.css']
})

// Export ViewUsersComponent class
export class ViewUsersComponent implements OnInit {
  users: EditableUser[] = []; // Array to hold user data with edit mode property
  message: string = ''; // Variable to hold message displayed to user

  // Constructor with injected UserService
  constructor(private userService: UserService) { }

  // ngOnInit lifecycle hook to get users from the user service
  ngOnInit() {
    this.userService.getUsers().subscribe((users: User[]) => {
      // Filter out users with isDisabled true and add isEditMode property
      this.users = users.filter(user => !user.isDisabled).map(user => ({
        ...user,
        isEditMode: false // Initialize isEditMode for UI purposes
      }));
    });
  }

  // deleteUser method to remove a user by id
  deleteUser(id: string) {
    // Confirm deletion with the user
    if (confirm('Are you sure you want to delete this user?')) {
      this.userService.deleteUser(id).subscribe(() => {
        // Update the users array by filtering out the deleted user
        this.users = this.users.filter(user => user._id !== id);
        // Display success message
        this.message = 'User deleted successfully!';
        // Clear the message after 5 seconds
        setTimeout(() => {
          this.message = '';
        }, 5000);

      }, error => {
        // Handle deletion error
        console.error(error);
        this.message = 'Error deleting user.';

        // Clear the message after 5 seconds
        setTimeout(() => {
          this.message = '';
        }, 5000);
      });
    }
  }

  // editUser method to enable edit mode for a user
  editUser(user: EditableUser) { // Use the EditableUser type
    user.isEditMode = true;
  }

  // saveUser method to save changes made to a user's details
  saveUser(user: EditableUser) { // Use the EditableUser type
    this.userService.updateUser(user._id, user).subscribe(() => {
      // Exit edit mode and display success message
      user.isEditMode = false;
      this.message = 'User updated successfully!';

      // Clear the message after 5 seconds
      setTimeout(() => {
        this.message = '';
      }, 5000);

    }, error => {
      // Handle update error
      console.error(error);
      this.message = 'Error updating user.';

      // Clear the message after 5 seconds
      setTimeout(() => {
        this.message = '';
      }, 5000);
    });
  }

  // cancelEdit method to cancel editing mode for a user
  cancelEdit(user: EditableUser) {
    user.isEditMode = false;
  }

}