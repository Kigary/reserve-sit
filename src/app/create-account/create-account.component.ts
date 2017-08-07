import { Component, OnInit } from '@angular/core';
import {FormGroup, Validators, FormBuilder, FormControl} from '@angular/forms';
@Component({
  selector: 'app-registre-account',
  templateUrl: './create-account.component.html',
  styleUrls: ['./create-account.component.css']
})
export class UserRegistreAccountComponent implements OnInit {
  regForm: FormGroup;
  isSubmit: boolean;

  constructor(private fb: FormBuilder) {
  }

  ngOnInit() {
    this.formBuild();
  }

  formBuild() {
    this.regForm = this.fb.group({
      login: ['', [Validators.required]],
      password: ['', [Validators.required, Validators.minLength(15)]],
      email: ['', []],
      FirstName: ['', [Validators.required]],
      LastName: ['', [Validators.required]],
      phone: ['', [Validators.required, Validators.pattern(/^\d*$/)]],
    });
  }

  UserRegister(data) {
    this.isSubmit = true;
  }

  errorStateMatcher(control: FormControl): boolean {
    return control.invalid && (control.dirty || control.touched);
  }
}
