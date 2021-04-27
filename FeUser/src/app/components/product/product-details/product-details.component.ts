import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PageModel, ProductModel, ReturnMessage } from 'src/app/lib/data/models';
import { ProductDetailsModel } from 'src/app/lib/data/models/products/product-details.model';
import { FileService } from 'src/app/lib/data/services';
import { ProductDetailsService } from 'src/app/lib/data/services/products/product-details.service';
import { SizeModalComponent } from 'src/app/shared/components/modal/size-modal/size-modal.component';
import { ProductDetailsMainSlider, ProductDetailsThumbSlider } from 'src/app/shared/data/slider';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss'],
  providers: [ProductDetailsService],
})
export class ProductDetailsComponent implements OnInit {

  public product: ProductDetailsModel;
  public counter: number = 1;
  public activeSlide: any = 0;
  public ImageSrc: string;
  @ViewChild("sizeChart") SizeChart: SizeModalComponent;

  public ProductDetailsMainSliderConfig: any = ProductDetailsMainSlider;
  public ProductDetailsThumbConfig: any = ProductDetailsThumbSlider;

  constructor(private productService: ProductDetailsService,
    private activedRoute:ActivatedRoute) 
    {
      this.getProduct();
     }

  ngOnInit(): void  {
  }

  getProduct(){
    let data = JSON.parse(localStorage.getItem('item'));
    this.product = data;
  }

  getImage(fileName: string) {
    return FileService.getLinkFile(fileName);
  }
}
