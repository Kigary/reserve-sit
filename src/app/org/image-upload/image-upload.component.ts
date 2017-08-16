import {Component, EventEmitter, forwardRef, Input} from '@angular/core';
import {ControlValueAccessor, NG_VALUE_ACCESSOR, NG_VALIDATORS, Validator, FormControl} from '@angular/forms';

const CONTROL_VALUE_ACCESSOR = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => ImageUploadComponent),
  multi: true
};

const CONTROL_VALIDATORS = {
  provide: NG_VALIDATORS,
  useExisting: forwardRef(() => ImageUploadComponent),
  multi: true
};

@Component({
  selector: 'org-image-upload',
  templateUrl: './image-upload.component.html',
  styleUrls: ['./image-upload.component.css'],
  providers: [
    CONTROL_VALUE_ACCESSOR,
    CONTROL_VALIDATORS
  ]
})

export class ImageUploadComponent implements ControlValueAccessor, Validator {

  private _value: string;

  @Input()
  get value() {
    return this._value;
  }
  set value(value) {
    this._value = value;

    this.change.emit(value);
  }

  @Input()
  disabled = false;

  change = new EventEmitter<string>();

  touch = new EventEmitter();

  constructor() { }

  onChange(ev) {
    const myFile = ev.currentTarget;
    const [file] = myFile.files;
    const fr = new FileReader();

    fr.addEventListener('load', () => {
      this.value = fr.result;
    });
    fr.readAsDataURL(file);
  }

  writeValue(value: string) {
    this.value = value;
  }
  registerOnChange(fn: any): void {
    this.change.subscribe(fn);
  }
  registerOnTouched(fn: any): void {
    this.touch.subscribe(fn);
  }
  setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }

  validate(c: FormControl): {[key: string]: any} {
    return c.value === null || c.value.length === 0 ? { "required" : true} : null;
  }
  registerOnValidatorChange(fn: () => void): void { }
}
