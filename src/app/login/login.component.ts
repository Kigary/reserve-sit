import {Component, OnInit} from '@angular/core';
import {FormGroup, Validators, FormBuilder, FormControl} from '@angular/forms';
import {Router} from '@angular/router';
import {AccountUserService} from '../services/auth.service';
import {MdDialog, MdDialogRef} from '@angular/material';

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
              private accountUserService: AccountUserService,
              private dialogRef: MdDialogRef<any>,) {
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

  login() {
    this.sentLogin = true;
    this.accountUserService.login(this.loginForm.value).subscribe(() => {
        this.storage.userLogin = 'true';
        this.dialogRef.close();
        this.router.navigate(['/']);
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
