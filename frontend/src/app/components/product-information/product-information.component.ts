
import { Component } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { environment } from 'src/app/environments/environments';
import { product } from 'src/app/interfaces/product';
import { ProductService } from 'src/app/services/product.service';

type paramsProduct = {
  name:string
}

@Component({
  selector: 'app-product-information',
  templateUrl: './product-information.component.html',
  styleUrls: ['./product-information.component.css']
})

export class ProductInformationComponent{
  private myAppUrl: string = environment.endpoint;
  productList: product[] = [];
  search!:Params | paramsProduct;


  constructor(private productService: ProductService, private router: Router, private activateRoute: ActivatedRoute) {
    this.activateRoute.params.subscribe((param) => {
      this.search = param;
    });
    this.getProductList();
  }

  updateSearch(upload:boolean){
    if(upload){
      this.activateRoute.params.subscribe((param) => {
        this.search = param;
        this.getProductList();
      });
    }
  }
  

  findProduct(item: product) {
    this.productService.setProduct(item);
    this.router.navigate([`dashboard/shopping/${item.id}`])
  }
  
  getUrl(image: string) {
    return `${this.myAppUrl}static/${image}`
  }

  async getProductList() {
    this.productService.getProductsByName(this.search.name).subscribe((data) => {
      this.productList = data;
    });
  }

}
