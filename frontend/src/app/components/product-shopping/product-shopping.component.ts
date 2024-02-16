import { Component, OnInit, afterNextRender } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { filter } from 'rxjs';
import { product } from 'src/app/interfaces/product';
import { CartService } from 'src/app/services/cart.service';
import { ProductService } from 'src/app/services/product.service';
import { __param } from 'tslib';

@Component({
  selector: 'app-product-shopping',
  templateUrl: './product-shopping.component.html',
  styleUrls: ['./product-shopping.component.css']
})
export class ProductShoppingComponent implements OnInit {
  x = 5;
  y = 2;
  newProduct: product | undefined;
  product: any;
  listOfProducts: product[] = [];
  amount: any = 0;
  stock: any;

  constructor(private _productService: ProductService,
    private activateRouter: ActivatedRoute, private cartService: CartService) {


  }

  async ngOnInit() {
    this._productService.getProduct().subscribe((data) => {
      this.newProduct = data;
    });

    this.activateRouter.params.subscribe((param) => {
      this.product = param;
      this.findProduct();
      setTimeout(() => {
        console.log("Producto", this.product)
        console.log("Producto", this.newProduct),
          this.stock = this.newProduct?.stock
      }, 500);

    })
  }


  findProduct() {
    this._productService.getProducts().subscribe((value) => {
      this.listOfProducts = value
      console.log(this.listOfProducts)
      let index = this.listOfProducts.findIndex((product) => product.id == this.product.id)
      console.log(index)
      this.newProduct = this.listOfProducts[index];
    })
  }

  addCart(newProduct: product, amount: any) {
    const product: product = {
      id: newProduct.id, //PK
      model: newProduct.model,
      brand: newProduct.brand,
      description: newProduct.description,
      price: newProduct.price,
      stock: newProduct.stock,
      image: newProduct.image,
      quantity: Number(amount),
      createdAt: newProduct.createdAt
    }
    this.cartService.addProduct(product);
  }

  getUrl(image: string | undefined) {
    return `http://localhost:3001/static/${image}`
  }

  increaseAmount() {
    if (this.amount < this.stock) {
      this.amount++
    }
  }

  decreaseAmount() {
    if (this.amount > 0) {
      this.amount--
    }
  }
}

