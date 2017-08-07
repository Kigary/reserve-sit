import {Component, EventEmitter, forwardRef, Input} from '@angular/core';
import {ControlValueAccessor, NG_VALUE_ACCESSOR} from '@angular/forms';

const CONTROL_VALUE_ACCESSOR = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => ImageUploadComponent),
  multi: true // TODO
};

@Component({
  selector: 'org-image-upload',
  templateUrl: './image-upload.component.html',
  styleUrls: ['./image-upload.component.css'],
  providers: [CONTROL_VALUE_ACCESSOR]
})
export class ImageUploadComponent implements ControlValueAccessor {
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

  private _touched = false;
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

  onBlur() {
    if (this._touched) {
      return;
    }

    this._touched = true;
    this.touch.emit();
  }

}
