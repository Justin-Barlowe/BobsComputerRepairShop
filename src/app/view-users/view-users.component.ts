// Name: Justin Barlowe
// Date: 2/15/2024
// File: view-users.component.ts
// Description: View users component file

import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import { User } from '../user';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-view-users',
  templateUrl: './view-users.component.html',
  styleUrls: ['./view-users.component.css']
})
export class ViewUsersComponent implements OnInit {
  users: User[] = [];
  message: string = '';

  constructor(private userService: UserService, private http: HttpClient) { }

  // ngOnInit method to get the users from the user service
  ngOnInit() {
    this.userService.getUsers().subscribe(users => {
      this.users = users;
    });
  }

  deleteUser(id: string) {
    if (confirm('Are you sure you want to delete this user?')) {
      this.userService.deleteUser(id).subscribe(() => {
        this.users = this.users.filter(user => user._id !== id);
        this.message = 'User deleted successfully!';
      },

      error => {
        console.error(error)
        this.message = 'Error deleting user.'
      });
    }
  }
  }