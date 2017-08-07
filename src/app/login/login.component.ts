import { Component, OnInit } from '@angular/core';
import {FormGroup, Validators, FormBuilder, FormControl} from '@angular/forms';
import {Router} from '@angular/router';

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
              private router: Router) {
  }

  ngOnInit() {
    this.formBuild();
  }
  formBuild() {
    this.loginForm = this.fb.group({
      login: ['', [Validators.required]],
      password: ['', [Validators.required, Validators.minLength(15)]]
    });
  }
  login(data) {
    this.sentLogin = true;
    // this.accountService.login(data.value).subscribe(() => {
    //     this.storage.orgLogin = 'true';
    //     this.router.navigate(['org/sits']);
    //   },
    //   (error) => {
    //     this.sentLogin = false;
    //     this.formBuild();
    //   });

  }
  errorStateMatcher(control: FormControl): boolean {
    return control.invalid && (control.dirty || control.touched);
  }
}
