import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  createUserForm: FormGroup;
  message: string = '';
  securityQuestions: string[] = [];

  constructor(private http: HttpClient, private router: Router) {
    this.createUserForm = new FormGroup({
      'userName': new FormControl(null, Validators.required),
      'password': new FormControl(null, [Validators.required, Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{8,}$/)]),
      'email': new FormControl(null, [Validators.required, Validators.email]),
      'firstName': new FormControl(null, Validators.required),
      'lastName': new FormControl(null, Validators.required),
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
    // Updated the URL to fetch security questions.
    this.http.get<string[]>('/api/security-questions') // Changed URL to a relative path
      .subscribe(questions => {
        this.securityQuestions = questions;
      }, error => {
        console.error('Failed to fetch security questions:', error);
        this.message = 'Failed to fetch security questions';
      });
  }

  // Password requirement message
  getPasswordRequirementsMessage(): string {
    const passwordControl = this.createUserForm.get('password');
    if (passwordControl?.hasError('pattern')) {
      return 'Password must contain at least one lowercase letter, one uppercase letter, one digit, and be at least 8 characters long';
    } else if (passwordControl?.hasError('required')) {
      return 'Password is required';
    }
    return '';
  }


  // Check if the question is already selected in another field
  isQuestionSelected(question: string, currentField: string): boolean {
    const otherFields = ['securityQuestion1', 'securityQuestion2', 'securityQuestion3'].filter(field => field !== currentField);
    for (let field of otherFields) {
      if (this.createUserForm.get(field)?.value === question) {
        return true;
      }
    }
    return false;
  }

  // Register the user by sending the form data to the server
  registerUser() {
    if (this.createUserForm.valid) {
      const user = {
        userName: this.createUserForm.value.userName,
        password: this.createUserForm.value.password,
        email: this.createUserForm.value.email,
        firstName: this.createUserForm.value.firstName,
        lastName: this.createUserForm.value.lastName,
        securityQuestions: [
          { question: this.createUserForm.value.securityQuestion1, answer: this.createUserForm.value.securityAnswer1 },
          { question: this.createUserForm.value.securityQuestion2, answer: this.createUserForm.value.securityAnswer2 },
          { question: this.createUserForm.value.securityQuestion3, answer: this.createUserForm.value.securityAnswer3 }
        ]
      };


      // Post the user to the server
      this.http.post('/api/security/register', user)
        .subscribe(response => {
          console.log(response);
          this.message = 'User created successfully';
          // Redirect to the login page after successful registration.
          this.router.navigate(['/security/signin']);
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