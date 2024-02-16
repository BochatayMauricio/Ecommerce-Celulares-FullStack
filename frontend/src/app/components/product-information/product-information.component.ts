
import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { product } from 'src/app/interfaces/product';
import { ProductService } from 'src/app/services/product.service';



@Component({
  selector: 'app-product-information',
  templateUrl: './product-information.component.html',
  styleUrls: ['./product-information.component.css']
})



export class ProductInformationComponent {

  productList: product[] = [];
  productString: any;
  search: any;
  constructor(private productService: ProductService, private router: Router, private activateRoute: ActivatedRoute) {

    this.activateRoute.params.subscribe((param) => {
      this.search = param;
      console.log(this.search.name)
    });

    this.getProductList();
  }
  findProduct(item: product) {
    this.productService.setProduct(item);
    this.router.navigate([`dashboard/shopping/${item.id}`])
  }
  getUrl(image: string) {
    return `http://localhost:3001/static/${image}`
  }

  async getProductList() {
    this.productService.getProductsByName(this.search.name).subscribe((data) => {
      this.productList = data;
      localStorage.setItem('Search', this.search.name)
    });
  }

}
