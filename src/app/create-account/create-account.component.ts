import { Component, OnInit } from '@angular/core';
import {FormGroup, Validators, FormBuilder, FormControl} from '@angular/forms';
import {UserService} from '../services/user.service';
import {EMAIL_REGEX} from '../org/register-account/register-account.component';
import {IGender} from '../defines/IGender';
import {Router} from '@angular/router';

@Component({
  selector: 'app-registre-account',
  templateUrl: './create-account.component.html',
  styleUrls: ['./create-account.component.css']
})
export class UserRegistreAccountComponent implements OnInit {
  regForm: FormGroup;
  isSubmit: boolean;
  genders: IGender[] = ['male', 'female'];
  constructor(private fb: FormBuilder,
              private userService: UserService,
              private router: Router) {
  }

  ngOnInit() {
    this.formBuild();
  }

  formBuild() {
    this.regForm = this.fb.group({
      login: ['', [Validators.required]],
      firstName: ['', [Validators.required]],
      lastName: ['', [Validators.required]],
      email: ['', [Validators.pattern(EMAIL_REGEX)]],
      phone: ['', [Validators.required, Validators.pattern(/^\d*$/)]],
      gender: ['male'],
      password: ['', [Validators.required, Validators.minLength(15)]]
    });
  }

  UserRegister(data) {
    this.isSubmit = true;
    this.userService.createUser(data.value).subscribe(() => {
        this.router.navigate(['account/login']);
      },
      (error) => console.log(error.message));
  }

  errorStateMatcher(control: FormControl): boolean {
    return control.invalid && (control.dirty || control.touched);
  }
}
