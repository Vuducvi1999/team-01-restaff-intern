import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ModalHeaderModel } from 'src/app/lib/data/models/modal.model';


@Component({
  selector: 'app-modal-header',
  templateUrl: './modal-header.component.html',
  styleUrls: ['./modal-header.component.css']
})
export class ModalHeaderComponent implements OnInit {

  @Input() data = new  ModalHeaderModel();
  @Output() onAction = new EventEmitter();

  constructor() { }

  ngOnInit() {
  }

  action() {
    this.onAction.emit("ok");
  }
}
