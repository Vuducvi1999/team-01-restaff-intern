import { Component, OnInit, SimpleChanges } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { FileDtoModel, ReturnMessage } from 'src/app/lib/data/models';
import { FileService } from 'src/app/lib/data/services';
import {
  ModalHeaderModel,
  ModalFooterModel,
  ModalFileImage,
} from 'src/app/shared/components/modals/models/modal.model';

@Component({
  selector: 'app-create-single-image',
  templateUrl: './create-single-image.component.html',
  styleUrls: ['./create-single-image.component.scss'],
})
export class CreateSingleImageComponent implements OnInit {
  modalHeader!: ModalHeaderModel;
  modalFooter!: ModalFooterModel;
  modalSingleImage!: ModalFileImage;
  select: any;
  item!: FileDtoModel;

  constructor(
    private ngbActiveModal: NgbActiveModal
  ) {
    
  }

  install() {
    this.modalHeader = new ModalHeaderModel();
    this.modalHeader.title = this.item ? `[Update] ${this.item.id}` : `[Add]`;
    this.modalFooter = new ModalFooterModel();
    this.modalFooter.title = 'Save';
    this.modalSingleImage = new ModalFileImage();
  }

  ngOnChanges(changes: SimpleChanges): void {
    // console.log(this.item);
  }

  onChangeData()
  {

  }

  ngOnInit() {
    this.install();
  }

  close(event: any) {
    console.log(event);
    this.ngbActiveModal.close();
  }

  save(event: any) {}
}
