// Name: John Davidson, Justin Barlowe, Nolan Berryhill
// Date: 2/25/2024
// File: verify-email.component.ts
// Description: verify-email component file

// Import statements
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from 'src/app/user.service';

// Component for selector, templateUrl, styleUrls
@Component({
  selector: 'app-verify-email',
  templateUrl: './verify-email.component.html',
  styleUrls: ['./verify-email.component.css']
})

// Export VerifyEmailComponent
export class VerifyEmailComponent {
  errorMessage: string; // error message variable
  isLoading: boolean = false; // loading variable

  // email form group for the verify email form
  emailForm: FormGroup;

  // Constructor with private
  constructor(private fb: FormBuilder, private router: Router, private userService: UserService) {
    this.errorMessage = '';
    // Initialize the form group
    this.emailForm = this.fb.group({
      email: [null, Validators.compose([Validators.required, Validators.email])]
    });
  }

  // verifyUser function to verify the email address entered by the user
  verifyUser() {
    this.isLoading = true; // set the isLoading variable to true

    const email = this.emailForm.controls['email'].value; // get the email address from the form

    // Call the UserService method to verify user email
    this.userService.verifyUser(email).subscribe({
      next: (res) => {
        console.log(res);
        // Navigate to the appropriate page based on the response
        if (res) {
          this.router.navigate(['/security/verify-questions'], { queryParams: { email }, skipLocationChange: true });
        } else {
          this.errorMessage = 'The email address you entered was not found.';
        }
      },
      error: (err) => {
        console.log('Server Error from verifyUser Call:', err);
        this.errorMessage = 'There was a problem verifying your email address. Please try again.';
      },
      complete: () => {
        this.isLoading = false; // set the isLoading variable to false
      }
    });
  }
}

