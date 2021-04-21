import { Component, OnInit, SimpleChanges } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { FileDtoModel, ReturnMessage } from 'src/app/lib/data/models';
import { FileService } from 'src/app/lib/data/services';
import {
  ModalHeaderModel,
  ModalFooterModel,
  ModalFile,
  TypeFile,
} from 'src/app/shared/components/modals/models/modal.model';

@Component({
  selector: 'app-create-image',
  templateUrl: './create-image.component.html',
  styleUrls: ['./create-image.component.scss'],
})
export class CreateImageComponent implements OnInit {
  modalHeader!: ModalHeaderModel;
  modalFooter!: ModalFooterModel;
  modalImage!: ModalFile;
  select: any;
  item!: FileDtoModel;
  typeMulti: number;

  constructor(private ngbActiveModal: NgbActiveModal) {}

  install() {
    this.modalHeader = new ModalHeaderModel();
    this.modalHeader.title = this.item ? `[Update] ${this.item.id}` : `[Add]`;
    this.modalFooter = new ModalFooterModel();
    this.modalFooter.title = 'Save';
    this.modalImage = new ModalFile();

    if (this.typeMulti == 1 || this.typeMulti == 2) {
      this.modalImage.typeFile = TypeFile.IMAGE;
    }
    if (this.typeMulti == 3 || this.typeMulti == 4) {
      this.modalImage.typeFile = TypeFile.FILE;
    }

    if (this.typeMulti == 1 || this.typeMulti == 3) {
      this.modalImage.multiBoolen = false;
    }

    if (this.typeMulti == 2 || this.typeMulti == 4) {
      this.modalImage.multiBoolen = true;
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    // console.log(this.item);
  }

  onChangeData(event: any) {
    console.log(event);
  }

  ngOnInit() {
    this.install();
  }

  close(event: any) {
    console.log(event);
    this.ngbActiveModal.close();
  }

  save(event: any) {
    console.log(event);
    this.ngbActiveModal.close();
  }
}
