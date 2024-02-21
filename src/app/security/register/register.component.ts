// Name: Justin Barlowe
// Date: 02/21/2023
// Description: This is the register component for the security module. It is used to create a new user account.
// File: register.component.ts

import { FormGroup, FormControl, Validators, ValidatorFn, AbstractControl, ValidationErrors } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  createUserForm: FormGroup;
  message: string = '';
  securityQuestions: string[] = [];

  // Inject the HttpClient service into the constructor
  // Create new form group with validators for each form control.
  // Created a custom vadlidator to check if the password and confirm password match.
  // Fetch the security questions from the server when the component is initialized.
  // Create a new user object from the form data and send it to the server.
  constructor(private http: HttpClient) {
    this.createUserForm = new FormGroup({
      'userName': new FormControl(null, Validators.required),
      'password': new FormControl(null, Validators.required),
      'email': new FormControl(null, [Validators.required, Validators.email]),
      'firstName': new FormControl(null),
      'lastName': new FormControl(null),
      'securityQuestion1': new FormControl(null, Validators.required),
      'securityAnswer1': new FormControl(null, Validators.required),
      'securityQuestion2': new FormControl(null, Validators.required),
      'securityAnswer2': new FormControl(null, Validators.required),
      'securityQuestion3': new FormControl(null, Validators.required),
      'securityAnswer3': new FormControl(null, Validators.required),
    });

  }
  ngOnInit() {
    this.fetchSecurityQuestions();
  }

  fetchSecurityQuestions() {

    // Will need to change this to relative path prior to deployment.
    this.http.get<string[]>('http://localhost:3000/api/security-questions')
      .subscribe(questions => {
        this.securityQuestions = questions;
      }, error => {
        console.error('Failed to fetch security questions:', error);
        this.message = 'Failed to fetch security questions';
      });
  }

  // Checks if security question was selected in the other fields.
  isQuestionSelected(question: string, currentField: string): boolean {
    const fields = ['securityQuestion1', 'securityQuestion2', 'securityQuestion3'];
    const otherFields = fields.filter(field => field !== currentField);

    return otherFields.some(field => this.createUserForm.get(field)?.value === question);
  }



  // Create a new user object from the form data and send it to the server.
  // If the form is not valid, display an error message.
  // If the server returns an error, display an error message.
  createUser(user: any) {
    if (this.createUserForm.valid) {
      this.http.post('http://localhost:3000/api/security', user)
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

}