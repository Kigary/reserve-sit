import { Component, OnInit } from '@angular/core';
import {FormGroup, Validators, FormBuilder, FormControl} from '@angular/forms';
import {Router} from '@angular/router';
import {AccountUserService} from '../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class UserLoginComponent implements OnInit {
  loginForm: FormGroup;
  sentLogin: boolean;
  storage: Storage;
  constructor(private fb: FormBuilder,
              private router: Router,
              private accountUserService: AccountUserService
  ) {
  }

  ngOnInit() {
    this.storage = sessionStorage;
    this.formBuild();
  }
  formBuild() {
    this.loginForm = this.fb.group({
      login: ['', [Validators.required]],
      password: ['', [Validators.required]]
    });
  }
  login(data) {
    this.sentLogin = true;
    this.accountUserService.login(data.value).subscribe(() => {
        this.storage.userLogin = 'true';
        this.router.navigate(['/home']);
      },
      (error) => {
        this.sentLogin = false;
        this.formBuild();
      });

  }
  errorStateMatcher(control: FormControl): boolean {
    return control.invalid && (control.dirty || control.touched);
  }
}
