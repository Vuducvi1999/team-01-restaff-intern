import {
  Component,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { UserModel } from 'src/app/lib/data/models/users/user.model';
import { UserService } from 'src/app/lib/data/services/users/user.service';

import {
  ModalFooterModel,
  ModalHeaderModel,
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
  @Input() item;

  constructor(
    private formBuilder: FormBuilder,
    private userService: UserService,
    private ngbActiveModal: NgbActiveModal
  ) {}

  ngOnInit() {
    this.loadItem();
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
      id: '',
    };
    if (!this.item?.id) {
      this.user.id = '';
      this.callServiceToCreate();
    }

    if (this.item?.id) {
      this.user.id = this.item.id;
      this.callServiceToUpdate();
    }
  }

  callServiceToUpdate() {
    this.userService
      .update(this.user)
      .then(() => {
        this.ngbActiveModal.close();
      })
      .catch((er) => {
        if (er.error.hasError) {
          console.log(er.error.message);
        }
      });
  }

  callServiceToCreate() {
    this.userService
      .create(this.user)
      .then(() => {
        this.ngbActiveModal.close();
      })
      .catch((er) => {
        if (er.error.hasError) {
          console.log(er.error.message);
        }
      });
  }

  close(event: any) {
    this.ngbActiveModal.close();
  }
}
