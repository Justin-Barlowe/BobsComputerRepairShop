import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from 'src/app/user.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-verify-questions',
  templateUrl: './verify-questions.component.html',
  styleUrls: ['./verify-questions.component.css']
})
export class VerifyQuestionsComponent implements OnInit {
  selectedSecurityQuestions: any[] = [];
  email: string = '';
  errorMessage: string = '';
  isLoadingLabels: boolean = true;
  isLoadingSubmit: boolean = false;
  securityQuestion1: string = '';
  securityQuestion2: string = '';
  securityQuestion3: string = '';
  sqForm: FormGroup;

  constructor(private route: ActivatedRoute, private router: Router, private userService: UserService, private fb: FormBuilder) {
    this.sqForm = this.fb.group({
      securityAnswer1: [null, Validators.compose([Validators.required])],
      securityAnswer2: [null, Validators.compose([Validators.required])],
      securityAnswer3: [null, Validators.compose([Validators.required])]
    });
  }

  ngOnInit(): void {
    this.email = this.route.snapshot.queryParamMap.get('email') || '';

    if (!this.email) {
      this.router.navigate(['/forgot-password']);
      return;
    }

    this.userService.fetchSecurityQuestions().subscribe({
      next: (data: any) => {
        this.selectedSecurityQuestions = data;
        console.log('Selected Security Questions:', this.selectedSecurityQuestions); // Add this line
        if (this.selectedSecurityQuestions.length >= 3) {
          this.securityQuestion1 = this.selectedSecurityQuestions[0];
          this.securityQuestion2 = this.selectedSecurityQuestions[1];
          this.securityQuestion3 = this.selectedSecurityQuestions[2];
        }
      },
      error: (err) => {
        console.error('Server Error:', err);
        this.errorMessage = 'There was a problem fetching security questions. Please try again.';
      },
      complete: () => {
        this.isLoadingLabels = false;
      }
    });
  }

  verifySecurityQuestions() {
    this.isLoadingSubmit = true;

    const answer1 = this.sqForm.controls['securityAnswer1'].value;
    const answer2 = this.sqForm.controls['securityAnswer2'].value;
    const answer3 = this.sqForm.controls['securityAnswer3'].value;

    const securityAnswers = [
      { question: this.securityQuestion1, answer: answer1 },
      { question: this.securityQuestion2, answer: answer2 },
      { question: this.securityQuestion3, answer: answer3 }
    ];

    this.userService.verifySecurityQuestions(this.email, securityAnswers).subscribe({
      next: (res) => {
        console.log('Response from verifySecurityQuestions:', res);
        this.router.navigate(['/security/reset-password'], { queryParams: { email: this.email }, skipLocationChange: true });
      },
      error: (err) => {
        console.error('Error verifying security questions:', err);
        if (err.error && err.error.message) {
          this.errorMessage = err.error.message;
        } else {
          this.errorMessage = 'An error occurred while verifying security questions. Please try again.';
        }
      },
      complete: () => {
        this.isLoadingSubmit = false;
      }
    });
  }
}
