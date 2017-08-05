import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'org-image-upload',
  templateUrl: './image-upload.component.html',
  styleUrls: ['./image-upload.component.css']
})
export class ImageUploadComponent implements OnInit {
  @Input()
  value: string;

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

  ngOnInit() {
  }

}
