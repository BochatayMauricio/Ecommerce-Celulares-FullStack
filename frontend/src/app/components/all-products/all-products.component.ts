import { Component } from '@angular/core';
import { product } from 'src/app/interfaces/product';
import { ProductService } from 'src/app/services/product.service';
import { Route, Router } from '@angular/router';

@Component({
  selector: 'app-all-products',
  templateUrl: './all-products.component.html',
  styleUrls: ['./all-products.component.css']
})
export class AllProductsComponent {

  listProducts: product[] = []

  constructor(private productService: ProductService, private router: Router) {
    this.getProducts();
  }
  getUrl(image: string) {
    return `http://localhost:3001/static/${image}`
  }

  findProduct(item: product) {
    this.productService.setProduct(item);
    this.router.navigate([`dashboard/shopping/${item.id}`])
  }

  getProducts() {
    this.productService.getProducts().subscribe(data => {
      this.listProducts = data;
    })
  }

}
