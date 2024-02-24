import { Component } from '@angular/core';
import { UserService } from 'src/app/user.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent {
  errorMessage: string = ''; // Error message variable
  email: string = ''; // Email address variable
  isLoading: boolean = false; // Loading variable

  // Change password form
  changePasswordForm: FormGroup;

  constructor(private fb: FormBuilder, private userService: UserService, private route: ActivatedRoute, private router: Router) {
    this.email = this.route.snapshot.queryParamMap.get('email') || ''; // Get the email address from the query string
    this.changePasswordForm = this.fb.group({
      password: [null, Validators.compose([Validators.required, Validators.pattern('^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$')])] // Password field
    });
  }

  changePassword() {
    this.isLoading = true; // Set the loading variable to true

    const password = this.changePasswordForm.controls['password'].value; // Get the password from the form

    this.userService.resetPassword(this.email, password).subscribe({
      next: (data) => {
        console.log(data);
        this.router.navigate(['/security/signin']); // Redirect to the signin page
      },
      error: (err) => {
        console.error(err);
        if (err.status === 404) {
          this.errorMessage = 'The password reset endpoint was not found. Please contact support.';
        } else {
          this.errorMessage = 'An error occurred while resetting your password. Please try again later.';
        }
        this.isLoading = false; // Set the loading variable to false
      },
      complete: () => {
        this.isLoading = false; // Set the loading variable to false
      }
    });
  }
}
