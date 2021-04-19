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
import { ModalFile, TypeFile } from '../models/modal.model';

@Component({
  selector: 'app-modal-single-image',
  templateUrl: './modal-single-image.component.html',
  styleUrls: ['./modal-single-image.component.scss'],
})
export class ModalSingleImageComponent implements OnInit, OnChanges {
  @Input() data = new ModalFile();
  @Input() url: string;
  
  @Input() styleFile: string;
  @Output() onAction = new EventEmitter();

  public file: File;
  public imgURL: string | ArrayBuffer;

  constructor(private fileService: FileService) {}
  ngOnChanges(changes: SimpleChanges): void {}

  ngOnInit() {}

  // onUpdate()
  // {
  //   this.createImage(this.file);
  // }

  onRemove()
  {
    this.imgURL = null;
    this.file = null;
  }

  onChangeImg(event) {
    var files = event.target.files;
    this.file = files[0];
    if (files.length === 0)
      return;
 
    var mimeType = files[0].type;
    if (mimeType.match(/image\/*/) == null) {
      alert("Only images are supported.");
      return;
    }
 
    var reader = new FileReader();
    reader.readAsDataURL(files[0]); 
    reader.onload = (_event) => { 
      this.imgURL = reader.result; 
    }
    this.createImage(this.file);
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
        this.data.listFile = res.data;
        alert(res.message);
        this.onRemove();
      })
      .catch((er) => console.log(er.error));
  }

  action() {
    this.onAction.emit('ok');
  }
}
