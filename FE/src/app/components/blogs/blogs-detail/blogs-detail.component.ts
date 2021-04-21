import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { BlogModel } from 'src/app/lib/data/models/blogs/blog.model';
import { BlogService } from 'src/app/lib/data/services/blogs/blog.service';
import {
  ModalFooterModel,
  ModalHeaderModel,
} from 'src/app/shared/components/modals/models/modal.model';

@Component({
  selector: 'app-blogs-detail',
  templateUrl: './blogs-detail.component.html',
  styleUrls: ['./blogs-detail.component.scss'],
})
export class BlogsDetailComponent implements OnInit {
  public blogForm: FormGroup;
  public item: any;
  public blog: BlogModel;
  public modalHeader: ModalHeaderModel;
  public modalFooter: ModalFooterModel;
  submitted = false;

  constructor(
    private formBuilder: FormBuilder,
    private ngbActiveModal: NgbActiveModal,
    private blogService: BlogService
  ) {}

  ngOnInit() {
    this.loadFormItem();
    this.createModal();
  }
  loadFormItem() {
    this.blogForm = this.formBuilder.group({
      title: [
        this.item ? this.item.title : '',
        [
          Validators.required,
          Validators.pattern('^(?=.*[a-zA-Z0-9])([a-zA-Z0-9]+)$'),
        ],
      ],
      shortDes: [
        this.item ? this.item.shortDes : '',
        [
          Validators.required,
          Validators.pattern('^(?=.*[a-zA-Z0-9])([a-zA-Z0-9]+)$'),
        ],
      ],
      contentHTML: [
        this.item ? this.item.contentHTML : '',
        Validators.required,
      ],
      imageUrl: [this.item ? this.item.imageUrl : '', Validators.required],
    });
  }

  createModal() {
    this.modalHeader = new ModalHeaderModel();
    this.modalHeader.title =
      this.item != null ? `Update ${this.item.title}` : `Add Banner`;
    this.modalFooter = new ModalFooterModel();
    this.modalFooter.title = 'Save';
  }

  saveBlog(event: any) {
    this.blog = {
      title: this.blogForm.controls.title.value,
      shortDes: this.blogForm.controls.shortDes.value,
      contentHTML: this.blogForm.controls.contentHTML.value,
      imageUrl: this.blogForm.controls.imageUrl.value,
      id: this.item ? this.item.id : '',
    };

    this.submitted = true;

    if (this.blogForm.valid) {
      this.blogService
        .save(this.blog)
        .then(() => {
          this.blogForm.reset();
          this.submitted = false;
          this.ngbActiveModal.close();
        })
        .catch((er) => {
          if (er.error.hasError) {
            console.log(er.error.message);
          }
        });
    }
  }

  close(event: any) {
    this.ngbActiveModal.close();
  }
  get blogFormControl() {
    return this.blogForm.controls;
  }
}
