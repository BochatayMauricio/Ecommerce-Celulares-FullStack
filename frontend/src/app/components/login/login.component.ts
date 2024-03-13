import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ErrorService } from 'src/app/services/error.service';
import { UserService } from 'src/app/services/user.service';

type loginUser = {
  email:string,
  password:string,
  isAdmin:boolean
}

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  adminLogin: boolean = false;
  loading: boolean = false;
  type = 'password'
  show: boolean = false;

  loginForm:FormGroup;

  constructor(
    private userService: UserService,
    private router: Router,
    private errorService: ErrorService,
    public fb:FormBuilder
  ) {
    localStorage.clear();
    this.loginForm = this.fb.group({
      email: ['', [Validators.required,Validators.email]],
      password: ['', [Validators.required]],
      isAdmin: [this.adminLogin]
    });
  }

  onSubmit(){

    const body:loginUser = {
      email: this.loginForm.value.email,
      password: this.loginForm.value.password,
      isAdmin: this.adminLogin
    }

    console.log(body)
    this.userService.login(body).subscribe({
      next: (res: any) => {
        const { tok, us } = res
        this.userService.setThisUser(us);
        this.userService.saveToken(tok);
        if (this.adminLogin) {
          this.router.navigate([`/admin`])
        } else {
          this.router.navigate([`/dashboard`])
        }
      },
      error: (e: HttpErrorResponse) => {
        this.errorService.msjError(e);
        this.loading = false;
      }
    });
  }

  showPassword(pass: HTMLInputElement) {

    if (pass.type == 'password') {
      pass.type = 'text'
    } else {
      pass.type = 'password'
    }
  }



}