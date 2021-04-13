import { Component, OnInit } from '@angular/core';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { PageModel, ReturnMessage } from 'src/app/lib/data/models';
import { CategoryModel } from 'src/app/lib/data/models/categories/category.model';
import { CategoriesService } from 'src/app/lib/data/services/categories/category.service';
import { CreateCategoriesComponent } from '../create-categories/create-categories.component';

@Component({
  selector: 'app-list-categories',
  templateUrl: './list-categories.component.html',
  styleUrls: ['./list-categories.component.scss'],
  providers: [CategoriesService]
})
export class ListCategoriesComponent implements OnInit {

  public categories = [];
  closeResult = '';
  constructor(private modalService: NgbModal,private service:CategoriesService) {
    this.fetch();
   }


   public settings = {
    mode :'external',
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


  edit(event: any){
    console.log(event);
    var modalRef =  this.modalService.open(CreateCategoriesComponent, {size: 'lg'});
    modalRef.componentInstance.data = event.data;
    modalRef.result.then((result) => {
      console.log(result);
      this.fetch();
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }


  delete(event: any){
    console.log(event);
    let category = event.data as CategoryModel;
    if (window.confirm("Are u sure?")) {
      this.service.delete(category).then(res => {
        this.fetch();
      });
    }

  }


  create(event:any){
    console.log(event);
    var modalRef =  this.modalService.open(CreateCategoriesComponent, {size: 'lg'});
    modalRef.componentInstance.data = event;
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
