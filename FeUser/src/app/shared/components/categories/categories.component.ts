import { Component, OnInit } from '@angular/core';
import { CategoryModel, PageModel, ReturnMessage } from 'src/app/lib/data/models';
import { CategoryService } from 'src/app/lib/data/services';
import { Product } from '../../classes/product';
import { ProductService } from '../../services/product.service';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss'],
  providers: [CategoryService],
})
export class CategoriesComponent implements OnInit {

  public products: Product[] = [];
  public collapse: boolean = true;
  public categories: CategoryModel[] = [];

  constructor(public productService: ProductService, public categoryService: CategoryService) { 
    this.productService.getProducts.subscribe(product => this.products = product);
    this.categoryService.get(null).then((res: ReturnMessage<PageModel<CategoryModel>>) => {
      this.categories = res.data.results;
    })
  }

  ngOnInit(): void {
  }

  get filterbyCategory() {
    const category = this.categories;
    return category
  }

}
