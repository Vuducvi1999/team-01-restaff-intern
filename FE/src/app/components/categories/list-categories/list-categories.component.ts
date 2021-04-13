import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ReturnMessage } from 'src/app/lib/data/models';
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
  
  constructor(private modalService: NgbModal,private service:CategoriesService) {
    this.service.get(null).then((res : ReturnMessage<CategoryModel[]>) => {
      if(!res.hasError)
      {
        console.log("category",res.data);
        this.categories = (res.data as any).results;
      }
    }).catch((er) => {
      
      if(er.error.hasError)
      {
        console.log(er.error.message)
      }
    });
   }

   public settings = {
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

  
  openCreate() {
    var modalRef = this.modalService.open(CreateCategoriesComponent, {
      size: 'lg'
    });
    modalRef.result.then(res => console.log(res));
  }

  ngOnInit() {
    
  }

}
