// Name: Justin Barlowe
// Date: 2/15/2024
// File: view-users.component.ts
// Description: View users component file

import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import { User } from '../user';

@Component({
  selector: 'app-view-users',
  templateUrl: './view-users.component.html',
  styleUrls: ['./view-users.component.css']
})
export class ViewUsersComponent implements OnInit {
  users: User[] = [];

  constructor(private userService: UserService) { }

  // ngOnInit method to get the users from the user service
  ngOnInit() {
    this.userService.getUsers().subscribe(users => {
      this.users = users;
    });
  }
}
