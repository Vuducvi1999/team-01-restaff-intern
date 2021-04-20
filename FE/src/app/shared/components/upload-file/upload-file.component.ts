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
import { ModalFile, TypeFile } from '../modals/models/modal.model';

@Component({
  selector: 'app-upload-file',
  templateUrl: './upload-file.component.html',
  styleUrls: ['./upload-file.component.scss'],
})
export class UploadFileComponent implements OnInit {
  @Input() data : ModalFile;
  @Input() styleFile: string;
  @Input() fileURL: (string | ArrayBuffer)[];
  @Output() onChange = new EventEmitter();

  public files: File[];

  public typeIMAGE = TypeFile.IMAGE;

  constructor(private fileService: FileService) {
    if (!this.fileURL) {
      this.fileURL = [];
    }
    this.files = [];
    this.styleFile = "width: 200px; height: 200;";
  }
  ngOnChanges(changes: SimpleChanges): void {}

  ngOnInit() {}

  // onUpdate()
  // {
  //   this.createImage(this.file);
  // }

  onRemoveLocal() {
    this.fileURL = [];
    this.files = [];
  }

  onRemoveUpdate(id: string) {
    this.data.listFile.forEach((e, i) => {
      if (e.id == id) {
        this.data.listFile.splice(i, 1);
      }
    });
  }

  onDownload(file: FileDtoModel) {
    return this.fileService.getLinkDownloadFile(file.url);
  }

  onChangeImg(event) {
    if (!this.data.multiBoolen) {
      this.onRemoveLocal();
    }
    var files = event.target.files;
    Array.from(files).forEach((file: File) => {
      if (file.size === 0) {
        return;
      }
      var mimeType = file.type;
      if (mimeType.match(/image\/*/) == null) {
        alert('Only images are supported.');
        return;
      }
      var reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = (_event) => {
        this.fileURL.push(reader.result);
      };
      this.files.push(file);
      // console.log(file);
    });
    this.createImage(this.files);
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
        this.onRemoveLocal();
        this.onChange.emit(this.data.listFile);
      })
      .catch((er) => console.log(er.error));
  }

  action() {
    this.onChange.emit('ok');
  }

  getImage(imageUrl: string) {
    return FileService.getLinkFile(imageUrl);
  }
}
