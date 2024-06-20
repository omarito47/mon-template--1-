import { NgStyle } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, FormControlDirective, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
// import { ContainerComponent, RowComponent, ColComponent, CardGroupComponent, TextColorDirective, CardComponent, CardBodyComponent, FormDirective, InputGroupComponent, InputGroupTextDirective, ButtonDirective } from '@coreui/angular';


@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css'],
  // imports: [ContainerComponent, RowComponent, ColComponent, CardGroupComponent, TextColorDirective, CardComponent, CardBodyComponent, FormDirective, InputGroupComponent, InputGroupTextDirective, IconDirective, FormControlDirective, ButtonDirective, NgStyle]

})
export class SignInComponent {
  signinForm!: FormGroup;
  formSubmitted = false;

  constructor(
    private http: HttpClient,
    private formBuilder: FormBuilder,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.signinForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }
  navigateToForgotPassword(){
    this.router.navigate(['/forgot-password']);
  }

  submitForm() {
    this.formSubmitted = true;

    if (this.signinForm.valid) {
      const formData = {
        email: this.signinForm.value.email,
        password: this.signinForm.value.password
      };
      
      this.http.post('http://127.0.0.1:9090/user/signin', formData, { headers: { 'Content-Type': 'application/json' } })
        .subscribe(
          (response: any) => {
            console.log(response);
            // Store user ID and token in local storage
            localStorage.setItem('userId', response.userId);
            localStorage.setItem('token', response.token);

            // Redirect to the home page
            this.router.navigate(['/homePage']);
          },
          (error) => {
            console.error(error);
            // Handle the error here
          }
        );
    }
  }
}