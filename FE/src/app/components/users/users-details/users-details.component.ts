import {
  Component,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { VirtualTimeScheduler } from 'rxjs';
import { FileDtoModel, ReturnMessage } from 'src/app/lib/data/models';
import { UserModel } from 'src/app/lib/data/models/users/user.model';
import { FileService } from 'src/app/lib/data/services';
import { UserService } from 'src/app/lib/data/services/users/user.service';

import {
  EntityType,
  ModalFile,
  ModalFooterModel,
  ModalHeaderModel,
  TypeFile,
} from 'src/app/shared/components/modals/models/modal.model';
@Component({
  selector: 'app-users-details',
  templateUrl: './users-details.component.html',
  styleUrls: ['./users-details.component.scss'],
  providers: [UserService],
})
export class UserDetailComponent implements OnInit {
  public usersForm: FormGroup;
  public permissionForm: FormGroup;
  public modalHeader: ModalHeaderModel;
  public modalFooter: ModalFooterModel;
  public user: UserModel;
  messageFail: string;
  @Input() item: UserModel;

  public modalFile: ModalFile;
  public fileURL: (String | ArrayBuffer)[];

  constructor(
    private formBuilder: FormBuilder,
    private userService: UserService,
    private ngbActiveModal: NgbActiveModal
  ) {
    this.modalFile = new ModalFile();
    this.modalFile.typeFile = TypeFile.IMAGE;
    this.modalFile.multiBoolen = false;
    this.modalFile.enityType = EntityType.USER;
  }

  ngOnInit() {
    this.loadItem();
    if (this.item) {
      this.fileURL = [];
      this.fileURL.push(this.item.imageUrl);
    }
  }

  loadItem() {
    this.usersForm = this.formBuilder.group({
      username: [this.item ? this.item.username : '', [Validators.required]],
      password: [this.item ? this.item.password : '', [Validators.required]],
      email: [this.item ? this.item.email : ''],
      firstName: [this.item ? this.item.firstName : ''],
      lastName: [this.item ? this.item.lastName : ''],
      imageUrl: [this.item ? this.item.imageUrl : ''],
    });

    this.modalHeader = new ModalHeaderModel();
    this.modalHeader.title = this.item ? `Update ${this.item.username}` : `Add`;
    this.modalFooter = new ModalFooterModel();
    this.modalFooter.title = 'Save';
  }

  save() {
    this.messageFail = '';

    if (this.usersForm.invalid) {
      console.log(this.usersForm);
      return;
    }

    this.user = {
      username: this.usersForm.value.username,
      password: this.usersForm.value.password,
      email: this.usersForm.value.email,
      firstName: this.usersForm.value.firstName,
      lastName: this.usersForm.value.lastName,
      imageUrl: this.usersForm.value.imageUrl,
      id: this.item ? this.item.id : '',
      files: this.modalFile.listFile,
    };

    this.callServiceToSave();
  }

  callServiceToSave() {
    this.userService
      .save(this.user)
      .then((data: ReturnMessage<UserModel>) => {
        this.ngbActiveModal.close();
      })
      .catch((e) => {
        if (e.error.message) this.messageFail = e.error.message;
        console.log(e);
      });
  }

  close(event: any) {
    this.ngbActiveModal.close();
  }

  onChangeData(event: { add: string[]; remove: string; removeAll: boolean }) {
    if (event == null) {
      return;
    }

    if (!this.fileURL) {
      this.fileURL = [];
    }

    if (event.add) {
      this.fileURL = [...this.fileURL, ...event.add];
    }

    if (event.remove) {
      this.fileURL.forEach((e, i) => {
        if (e == event.remove) {
          this.fileURL.splice(i, 1);
        }
      });
    }

    if (event.removeAll) {
      this.fileURL = [];
    }

    this.usersForm.controls.imageUrl.setValue(this.fileURL.toString());
  }
}
