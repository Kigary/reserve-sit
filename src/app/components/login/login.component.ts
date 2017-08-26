import { MdDialogRef } from '@angular/material';
import { Component, OnInit } from '@angular/core';
import { AccountUserService } from '../../services/auth.service';
import { FormGroup, Validators, FormBuilder, FormControl } from '@angular/forms';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})

export class UserLoginComponent implements OnInit {
  loginForm: FormGroup;
  loading: boolean;
  error: string;

  constructor(private fb: FormBuilder,
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
      }
    );
  }

  errorStateMatcher(control: FormControl): boolean {
    return control.invalid && (control.dirty || control.touched);
  }

  ngOnInit() {
    this.formBuild();
  }
}
