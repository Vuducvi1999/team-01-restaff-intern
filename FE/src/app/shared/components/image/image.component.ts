import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-image',
  templateUrl: './image.component.html',
  styleUrls: ['./image.component.scss'],
})
export class ImageComponent implements OnInit {
  @Input() value: string;
  constructor() {}

  ngOnInit() {}

  get image() {
    if(!this.value)
    {
      return null;
    }
    var fileExt = this.value.split(',')[0].split('.').pop();
    if (
      fileExt == 'png' ||
      fileExt == 'jpg' ||
      fileExt == 'jpeg' ||
      fileExt == 'icon'
    ) { 
      return this.value.split(',')[0];
    }
    return '';
  }
}
