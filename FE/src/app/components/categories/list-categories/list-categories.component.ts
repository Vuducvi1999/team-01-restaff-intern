import { Component, OnInit } from '@angular/core';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { PageModel, ReturnMessage } from 'src/app/lib/data/models';
import { CategoryModel } from 'src/app/lib/data/models/categories/category.model';
import { CategoryService } from 'src/app/lib/data/services/categories/category.service';
import { CategoryDetailComponent } from '../categories-details/categories-details.component';

@Component({
  selector: 'app-list-categories',
  templateUrl: './list-categories.component.html',
  styleUrls: ['./list-categories.component.scss'],
  providers: [CategoryService]
})
export class ListCategoriesComponent implements OnInit {

  public categories = [];
  closeResult = '';
  constructor(private modalService: NgbModal,private service:CategoryService) {
    this.fetch();
   }


   public settings = {
    mode :'external',
    setPaging:{
      
    },
    actions: {
      position: 'right'
    },
    columns: {
      vendor: {
        title: 'Category',
        type: 'html',
      },
      name: {
        title: 'Name'
      },
      description: {
        title: 'Description'
      },
      imageUrl: {
        title: 'Image URL',
      }
    },
  };


  delete(event: any){
    console.log(event);
    let category = event.data as CategoryModel;
    if (window.confirm("Are u sure?")) {
      this.service.delete(category).then(res => {
        this.fetch();
      });
    }

  }


  openPopup(item:any){
    console.log(item);
    var modalRef =  this.modalService.open(CategoryDetailComponent, {size: 'lg'});
    modalRef.componentInstance.item = item;
    modalRef.result.then((result) => {
      console.log(result);
      this.fetch();
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }


  fetch() {
    this.service.get(null).then((res : ReturnMessage<PageModel<CategoryModel>>) => {
      if(!res.hasError)
      {
        console.log("category",res.data);
        this.categories = res.data.results;
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
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }

  ngOnInit() {
  }
}
