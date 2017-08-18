import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { AccountUserService } from '../../services/auth.service';
import { MdDialogRef } from '@angular/material';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})

export class UserLoginComponent implements OnInit {
  loginForm: FormGroup;
  loading: boolean;
  storage: Storage;
  error: string;
  constructor(private fb: FormBuilder,
              private router: Router,
              private accountUserService: AccountUserService,
              private dialogRef: MdDialogRef<any>) {
  }

  formBuild() {
    this.loginForm = this.fb.group({
      login: ['', [Validators.required]],
      password: ['', [Validators.required]]
    });
  }

  logIn() {
    this.loading = true;
    this.accountUserService.logIn(this.loginForm.value).subscribe((data) => {
        this.dialogRef.close();
      },
      (error) => {
        this.loading = false;
        this.error = error.error.message;
        this.formBuild();
      });
  }

  errorStateMatcher(control: FormControl): boolean {
    return control.invalid && (control.dirty || control.touched);
  }

  ngOnInit() {
    this.storage = sessionStorage;
    this.formBuild();
  }
}
