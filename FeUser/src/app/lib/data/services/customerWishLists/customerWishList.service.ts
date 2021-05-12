import { Injectable } from "@angular/core";
import { HttpClientService } from "src/app/lib/http/http-client";
import {
  CreateCustomerWishListModel,
  CustomerWishListModel,
  DeleteCustomerWishListModel,
} from "../../models/customerWishList/customerWishList.model";

@Injectable()
export class CustomerWishListService {
  private url = "/api/customer-wish-list";

  constructor(private httpClient: HttpClientService) {}

  getByCustomer(id: string, request: any = null) {
    request = { params: { loading: true } };
    return this.httpClient
      .getObservable(this.url + `/${id}`, request)
      .toPromise();
  }

  create(model: CreateCustomerWishListModel) {
    return this.httpClient.postObservable(this.url, model).toPromise();
  }

  delete(model: DeleteCustomerWishListModel) {
    const url = `${this.url}?CustomerId=${model.customerId}&ProductId=${model.productId}`;
    return this.httpClient.deleteObservable(url).toPromise();
  }
}
