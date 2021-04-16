import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
} from '@angular/core';
import { FileDtoModel, ReturnMessage } from 'src/app/lib/data/models';
import { FileService } from 'src/app/lib/data/services';
import { ModalFileImage } from '../models/modal.model';

@Component({
  selector: 'app-modal-single-image',
  templateUrl: './modal-single-image.component.html',
  styleUrls: ['./modal-single-image.component.scss'],
})
export class ModalSingleImageComponent implements OnInit, OnChanges {
  @Input() data = new ModalFileImage();
  @Input() url: string;
  @Input() styleFile: string;
  @Output() onAction = new EventEmitter();

  constructor(private fileService: FileService) {}
  ngOnChanges(changes: SimpleChanges): void {}

  ngOnInit() {}

  onChangeImg(event) {
    this.createImage(event.target.files[0]);
  }

  async createImage(file: File) {
    console.log(this.data);
    var formData = new FormData();
    formData.append('files', file);
    formData.append('entityType', this.data.enityType);
    formData.append('entityId', this.data.enityId);
    await this.fileService
      .saveFile(formData)
      .then((res: ReturnMessage<FileDtoModel[]>) => {
        this.data.listurl = res.data;
        console.log(this.data.listurl);
      })
      .catch((er) => console.log(er.error));
  }

  action() {
    this.onAction.emit('ok');
  }
}
