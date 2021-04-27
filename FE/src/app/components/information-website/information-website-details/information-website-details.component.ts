import { Component, OnInit, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { InformationWebModel } from 'src/app/lib/data/models/information-website/info-web.model';
import { InformationWebsiteService } from 'src/app/lib/data/services/information-website/infoWeb.service';
import { ModalFooterModel, ModalHeaderModel } from 'src/app/shared/components/modals/models/modal.model';

@Component({
  selector: 'app-information-website-details',
  templateUrl: './information-website-details.component.html',
  styleUrls: ['./information-website-details.component.scss'],
  providers: [InformationWebsiteService]
})
export class InformationWebsiteDetailsComponent implements OnInit {

  public infoWebForm : FormGroup;
  public modalHeader: ModalHeaderModel;
  public modalFooter: ModalFooterModel;
  public infoWeb: InformationWebModel;
  public item: any;
  submitted = false;


  constructor(
    private formBuilder: FormBuilder,
    private infoWebService: InformationWebsiteService,
    private ngbActiveModal: NgbActiveModal
  ) { }


  ngOnChanges(changes: SimpleChanges): void {}

  ngOnInit() {
    this.loadItem();
  }



  get infoWebFormControl() {
    return this.infoWebForm.controls;
  }

  save(){
    if(this.infoWebForm.invalid){
      window.alert("Invalid Form !");
      return;
    }
    //Address , Phone, Email, Fax, Logo
    this.submitted = true;
    this.infoWeb = {address: this.infoWebForm.value.address, 
      phone: this.infoWebForm.value.phone,
      email: this.infoWebForm.value.email,
      fax: this.infoWebForm.value.fax,
      logo: this.infoWebForm.value.logo,
      createdBy: this.item ? this.item.createdBy : this.item,
      createdByName: this.item ? this.item.createdByName : this.item,
      deletedBy: this.item ? this.item.deletedBy : this.item,
      deletedByName: this.item ? this.item.deletedByName : this.item,
      isActive: this.item ? this.item.isActive : this.item,
      isDeleted: this.item ? this.item.isDeleted : this.item,
      updatedBy: this.item ? this.item.updatedBy : this.item,
      updatedByName: this.item ? this.item.updatedByName : this.item,
      id: this.item ? this.item.id : '',};
    return this.infoWebService.update(this.infoWeb)
                    .then(() => {
                        this.ngbActiveModal.close();
                    }).catch((er) => {
                      if (er.error.hasError) {
                        console.log(er.error.message)
                      }
                    });
  }
  loadItem() {
    this.infoWebForm = this.formBuilder.group({
      address: [this.item ? this.item.address : '',
       [Validators.required, Validators.pattern('[a-zA-Z0-9 ]*')]
      ],
      phone: [
        this.item ? this.item.phone : '',
        [Validators.required, Validators.pattern('[0-9]*')]
      ],
      email: [this.item ? this.item.email : '',
      [Validators.required, Validators.pattern('[a-zA-Z0-9 ]*')]
      ],
      fax: [this.item ? this.item.fax : '',
      [Validators.required, Validators.pattern('[0-9]*')]
      ],
      logo: [this.item ? this.item.logo : '',
      [Validators.required, Validators.pattern('[a-zA-Z0-9 ]*')]
      ],
     

    });

    this.modalHeader = new ModalHeaderModel();
    this.modalHeader.title = this.item ? `[Update] ${this.item.name}` : `[Add]`;
    this.modalFooter = new ModalFooterModel();
    this.modalFooter.title = 'Save';
  }

  close(event: any) {
    this.ngbActiveModal.close();
  }
}
