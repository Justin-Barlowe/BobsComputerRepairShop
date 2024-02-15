// Name: Justin Barlowe
// Date: 02/15/2023
// File: create-user.component.ts
// Description: This file contains the logic for the create user form.


import { FormGroup, FormControl, Validators, ValidatorFn, AbstractControl, ValidationErrors } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { User } from '../user';

@Component({
  selector: 'app-create-user',
  templateUrl: './create-user.component.html',
  styleUrls: ['./create-user.component.css']
})
export class CreateUserComponent implements OnInit {
  createUserForm: FormGroup;
  message: string = '';

  // Inject the HttpClient service into the constructor
  // Create new form group with validators for each form control.
  // Created a custom vadlidator to check if the password and confirm password match.
  constructor(private http: HttpClient) {
    this.createUserForm = new FormGroup({
      'userName': new FormControl(null, Validators.required),
      'password': new FormControl(null, Validators.required),
      'confirmPassword': new FormControl(null, Validators.required),
      'email': new FormControl(null, [Validators.required, Validators.email]),
      'firstName': new FormControl(null),
      'lastName': new FormControl(null),
      'phoneNumber': new FormControl(null),
      'address': new FormControl(null)
    }, { validators: this.passwordMatchValidator });

  }
  ngOnInit() {}


  // Create a new user object from the form data and send it to the server.
  // If the form is not valid, display an error message.
  // If the server returns an error, display an error message.
  createUser(user: any) {
    if (this.createUserForm.valid) {
      this.http.post('http://localhost:3000/api/users', user)
        .subscribe(response => {
          console.log(response);
          this.message = 'User created successfully';
          this.createUserForm.reset(); // Reset form after submission.
        }, error => {
          console.error(error);
          this.message = 'An error occurred while creating the user';
        });
    } else {
      this.message = 'Please complete the form before submitting.';
    }
  }

  // Custom validator to check if the password and confirm password match.
  // If they do not match, return an error.
  passwordMatchValidator: ValidatorFn = (control: AbstractControl): ValidationErrors | null => {
    const password = control.get('password');
    const confirmPassword = control.get('confirmPassword');

    return password && confirmPassword && password.value === confirmPassword.value ? null : { 'NoPassswordMatch': true };
  };
}