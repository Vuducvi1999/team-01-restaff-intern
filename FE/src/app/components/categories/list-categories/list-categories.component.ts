import { Component, OnInit } from '@angular/core';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { PageModel, ReturnMessage } from 'src/app/lib/data/models';
import { CategoryModel } from 'src/app/lib/data/models/categories/category.model';
import { FileService } from 'src/app/lib/data/services';
import { CategoryService } from 'src/app/lib/data/services/categories/category.service';
import { CategoryDetailComponent } from '../categories-details/categories-details.component';

@Component({
  selector: 'app-list-categories',
  templateUrl: './list-categories.component.html',
  styleUrls: ['./list-categories.component.scss'],
  providers: [CategoryService, FileService]
})
export class ListCategoriesComponent implements OnInit {

  public categories: CategoryModel[];
  closeResult = '';
  constructor
  (
    private modalService: NgbModal,
    private categoryService:CategoryService,
  )
  {
    this.fetch();
  }


   public settings = 
   {
      mode :'external',
      actions: 
      {
        position: 'right'
      },
      columns: 
      {
        imageUrl: {
          title: 'Image',
          type: 'html',
          filter: false,
          valuePrepareFunction: (file) => {
            var fileExt = file.split('.').pop();
            if (
              fileExt == 'png' ||
              fileExt == 'jpg' ||
              fileExt == 'jpeg' ||
              fileExt == 'icon'
            ) {
              return `<a href="${FileService.getLinkFile(file)}"><img width="75px" height="75px" src="${FileService.getLinkFile(file)}"/></a>`;
            }
            return `<a href="${FileService.getLinkFile(file)}">${FileService.getLinkFile(file)}</a>`;
          },
        },
        name: {
          title: 'Name'
        },
        description: {
          title: 'Description'
        },
      },
    };


  delete(event: any){
    let category = event.data as CategoryModel;
    if (window.confirm("Are u sure?")) {
      this.categoryService.delete(category).then(() => {
        this.fetch();
      });
    }

  }

  openPopup(item:any){
    var modalRef = this.modalService.open(CategoryDetailComponent, {size: 'xl'});
    modalRef.componentInstance.item = item?.data;
    return modalRef.result.then(() => {
        this.fetch();
      }, (reason) => {
        this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
      }
    );
    }




  fetch()
  {
    this.categoryService
      .get(null)
      .then((res : ReturnMessage<PageModel<CategoryModel>>) => {
      if(!res.hasError)
      {
        this.categories = res.data.results.filter(r => r.isDeleted == false);
      }
    }).catch((er) => {
      
      if(er.error.hasError)
      {
        window.alert("Can not connect to Server !");
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
