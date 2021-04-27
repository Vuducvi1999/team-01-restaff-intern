import { Component, OnInit } from '@angular/core';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { PageModel, ReturnMessage } from 'src/app/lib/data/models';
import { InformationWebModel } from 'src/app/lib/data/models/information-website/info-web.model';
import { InformationWebsiteService } from 'src/app/lib/data/services/information-website/infoWeb.service';
import { InformationWebsiteDetailsComponent } from '../information-website-details/information-website-details.component';

@Component({
  selector: 'app-list-information-website',
  templateUrl: './list-information-website.component.html',
  styleUrls: ['./list-information-website.component.scss'],
  providers: [InformationWebsiteService]
})
export class ListInformationWebsiteComponent implements OnInit {

  public infoWeb: InformationWebModel;
  closeResult = '';
  constructor(private modalService: NgbModal,private inforWebService:InformationWebsiteService) { }

    //Address , Phone, Email, Fax, Logo
  public settings = 
  {
     mode :'external',
     actions: 
     {
       position: 'right'
     },
     columns: 
     {
       address: {
         title: 'Address'
       },
       phone: {
         title: 'Phone'
       },
       email: {
        title: 'Email'
       },
       fax: {
        title: 'Fax'
       },
       logo: {
        title: 'Logo'
       },
     },
   };

   openPopup(item:any){
      var modalRef =  this.modalService.open(InformationWebsiteDetailsComponent, {size: 'lg'});
      modalRef.componentInstance.item = item.data;
      return modalRef.result.then(() => {
              this.fetch();
            }, (reason) => {
              this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
            });
  }




  fetch() {
    this.inforWebService.get(null).then((res : ReturnMessage<InformationWebModel>) => {
      if(!res.hasError)
      {
        this.infoWeb = res.data;
      }
    }).catch((er) => {
      
      if(er.error.hasError)
      {
        console.log(er.error.message)
      }
    });
  }

  
  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else {
      return `with: ${reason}`;
    }
  }
  ngOnInit() {
    this.fetch();
  }

}
