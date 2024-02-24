import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component } from '@angular/core';
import { UserService } from 'src/app/user.service';
import { ActivatedRoute, Router } from '@angular/router';


@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent {
  errorMessage: string // error message variable
  email: string // email address variable
  isLoading: boolean = false // loading variable

  // change password form
  changePasswordForm: FormGroup = this.fb.group({
    password: [null, Validators.compose([Validators.required, Validators.pattern('^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$')])] // password field
  })

  constructor (private fb: FormBuilder, private userService: UserService, private route: ActivatedRoute, private router: Router) {
    this.email = this.route.snapshot.queryParamMap.get('email') ?? '' // get the email address from the query string
    this.errorMessage = '' // initialize the errorMessage variable

    // if no email address is found, redirect to the forgot password page
    if (!this.email) {
      console.log('No email address found')
      // this.router.navigate(['/'])
    } // end if
  } // end constructor

  changePassword() {
    this.isLoading = true // set the isLoading variable to true

    const password = this.changePasswordForm.controls['password'].value // get the password from the form

    this.userService.resetPassword(this.email, password).subscribe({
      next: (data) => {
        console.log(data)
        // this.router.navigate(['/']) // redirect to the signin page
      },
      error: (err) => {
        console.log(err)
        this.errorMessage = err // assign the error message
        this.isLoading = false // set the isLoading variable to false
      },
      complete: () => {
        this.isLoading = false // set the isLoading variable to false
      }
    })
  }
}
