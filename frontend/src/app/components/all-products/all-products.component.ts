import { Component } from '@angular/core';
import { product } from 'src/app/interfaces/product';
import { ProductService } from 'src/app/services/product.service';
import { Route, Router } from '@angular/router';
import { environment } from 'src/app/environments/environments';

@Component({
  selector: 'app-all-products',
  templateUrl: './all-products.component.html',
  styleUrls: ['./all-products.component.css']
})
export class AllProductsComponent {
  private myAppUrl: string = environment.endpoint;
  listProducts: product[] = []

  constructor(private productService: ProductService, private router: Router) {
    this.productService.retraiveProducts();
    this.getProducts();
  }
 
  getUrl(image: string) {
    return `${this.myAppUrl}static/${image}`
  }

  findProduct(item: product) {
   this.productService.setProduct(item);
    this.router.navigate([`dashboard/shopping/${item.id}`])
  }

  getProducts() {
    this.productService.getProductsObs().subscribe(data => {
      this.listProducts = data;
    })
  }

}
