import {Component, OnInit} from '@angular/core';
import {FormGroup, Validators, FormBuilder, FormControl} from '@angular/forms';
import {AccountService} from '../services/auth/account.service';
import {Router} from '@angular/router';

@Component({
  selector: 'org-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  sentLogin: boolean;

  constructor(private fb: FormBuilder,
              private accountService: AccountService,
              private router: Router) {
  }

  ngOnInit() {
    this.formBuild();
  }

  formBuild() {
    this.loginForm = this.fb.group({
      login: ['', [Validators.required]],
      password: ['', [Validators.required]]
    });
  }

  login() {
    this.sentLogin = true;
    this.accountService.login(this.loginForm.value).subscribe(() => {
        this.router.navigate(['org/sits']);
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

