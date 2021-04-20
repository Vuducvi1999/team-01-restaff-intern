import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ReturnMessage, FileDtoModel } from 'src/app/lib/data/models';
import { FileService } from 'src/app/lib/data/services';
import { ModalFile } from '../models/modal.model';

@Component({
  selector: 'app-modal-multi-image',
  templateUrl: './modal-multi-image.component.html',
  styleUrls: ['./modal-multi-image.component.scss'],
})
export class ModalMultiImageComponent implements OnInit {
  @Input() data = new ModalFile();
  @Input() url: string;
  @Input() styleFile: string;
  @Output() onAction = new EventEmitter();
  constructor(private fileService: FileService) {}

  ngOnInit() {}
  async createImage(files: File[]) {
    console.log(this.data);
    var formData = new FormData();
    Array.from(files).forEach((file) => {
      formData.append('files', file);
    });

    formData.append('entityType', this.data.enityType);
    formData.append('entityId', this.data.enityId);
    await this.fileService
      .saveFile(formData)
      .then((res: ReturnMessage<FileDtoModel[]>) => {
        this.data.listFile = res.data;
      })
      .catch((er) => console.log(er.error));
  }

  onChangeImg(event) {
    this.createImage(event.target.files);
  }
}
