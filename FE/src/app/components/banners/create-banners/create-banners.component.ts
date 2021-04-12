import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { BannerModel } from 'src/app/lib/data/models';
import { BannersService } from 'src/app/lib/data/services/banners/banners.service';

@Component({
  selector: 'app-create-banners',
  templateUrl: './create-banners.component.html',
  styleUrls: ['./create-banners.component.scss'],
  providers: [BannersService]
})
export class CreateBannersComponent implements OnInit {
  public bannersForm: FormGroup;
  public permissionForm: FormGroup;
  public banner: BannerModel;

  constructor(private formBuilder: FormBuilder,
    //  private service: BannersService
  ) {
    this.createBannerForm();
    this.createPermissionForm();
  }

  createBannerForm() {
    this.bannersForm = this.formBuilder.group({
      title: [''],
      description: [''],
      link: [''],
      imageURL: [''],
      displayOrder: ['']
    })
  }
  createPermissionForm() {
    this.permissionForm = this.formBuilder.group({
    })
  }

  createBanner() {
    this.banner = {
      title: this.bannersForm.controls.title.value,
      description: this.bannersForm.controls.description.value,
      link: this.bannersForm.controls.link.value,
      imageURL: this.bannersForm.controls.imageURL.value,
      displayOrder: this.bannersForm.controls.displayOrder.value,
      id: ""
    }
    // this.service.create(this.banner).then(res => console.log(res));
  }

  ngOnInit() { }

}
