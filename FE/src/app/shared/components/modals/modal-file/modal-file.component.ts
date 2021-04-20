import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { ReturnMessage, FileDtoModel } from 'src/app/lib/data/models';
import { FileService } from 'src/app/lib/data/services';
import { ModalFile } from '../models/modal.model';

@Component({
  selector: 'app-modal-file',
  templateUrl: './modal-file.component.html',
  styleUrls: ['./modal-file.component.scss'],
})
export class ModalFileComponent implements OnInit {
  @Input() data = new ModalFile();
  @Input() url: string;
  @Input() styleFile: number;
  @Output() onAction = new EventEmitter();
  constructor(
    private fileService: FileService,
    private sanitizer: DomSanitizer
  ) {}

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

  onDownload(file: FileDtoModel) {
    // var httpParams = { url: file.url };
    // await this.fileService
    //   .downloadFile({ params: httpParams })
    //   .subscribe((res) => {
    //     window.location.href = res;
    //   });
    return this.fileService.getLinkDownloadFile(file.url);
  }
}
