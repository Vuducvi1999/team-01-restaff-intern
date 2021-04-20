import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  SimpleChanges,
} from '@angular/core';
import { ReturnMessage, FileDtoModel } from 'src/app/lib/data/models';
import { FileService } from 'src/app/lib/data/services';
import { ModalFile } from '../modals/models/modal.model';

@Component({
  selector: 'app-upload-file',
  templateUrl: './upload-file.component.html',
  styleUrls: ['./upload-file.component.scss'],
})
export class UploadFileComponent implements OnInit {
  @Input() data = new ModalFile();
  @Input() styleFile: string;
  @Output() onChange = new EventEmitter();

  public files: File[];
  public imgURL: (string | ArrayBuffer)[];

  constructor(private fileService: FileService) {
    this.imgURL = [];
    this.files = [];
  }
  ngOnChanges(changes: SimpleChanges): void {}

  ngOnInit() {}

  // onUpdate()
  // {
  //   this.createImage(this.file);
  // }

  onRemove() {
    this.imgURL = [];
    this.files = [];
  }

  onChangeImg(event) {
    var files = event.target.files;
    // Array.from(files).forEach((file) => {
    //   if (file.length === 0) {
    //     return;
    //   }
    //   var mimeType = file.type;
    //   if (mimeType.match(/image\/*/) == null) {
    //     alert('Only images are supported.');
    //     return;
    //   }
    //   var reader = new FileReader();
    //   reader.readAsDataURL(file);
    //   reader.onload = (_event) => {
    //     this.imgURL.push(reader.result);
    //   };
    //   // this.files.push(file);
    //   console.log(file);
    // });
    // this.createImage(this.files);
  }

  async createImage(files: File[]) {
    if (files.length <= 0) {
      return;
    }
    var formData = new FormData();
    files.forEach((file) => {
      formData.append('files', file);
    });
    formData.append('entityType', this.data.enityType);
    formData.append('entityId', this.data.enityId);
    await this.fileService
      .saveFile(formData)
      .then((res: ReturnMessage<FileDtoModel[]>) => {
        this.data.listFile = res.data;
        alert(res.message);
        this.onRemove();
        this.action();
      })
      .catch((er) => console.log(er.error));
  }

  action() {
    this.onChange.emit('ok');
  }
}
