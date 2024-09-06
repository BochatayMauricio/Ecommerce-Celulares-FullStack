import { Component, OnInit, afterNextRender } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { environment } from 'src/app/environments/environments';
import { product } from 'src/app/interfaces/product';
import { CartService } from 'src/app/services/cart.service';
import { ProductService } from 'src/app/services/product.service';
import { __param } from 'tslib';

interface paramsProduct extends Params{
  id?:number
}

@Component({
  selector: 'app-product-shopping',
  templateUrl: './product-shopping.component.html',
  styleUrls: ['./product-shopping.component.css']
})
export class ProductShoppingComponent implements OnInit {
  x = 5;
  y = 2;
  newProduct?: product;
  product!: paramsProduct;
  listOfProducts: product[] = [];
  amount: number = 0;
  stock!: number;
  private myAppUrl: string = environment.endpoint;

  constructor(private productService: ProductService,
    private activateRouter: ActivatedRoute, private cartService: CartService, private toast: ToastrService) {
  }

  ngOnInit() {
    this.productService.getProduct().subscribe((data) => {
      this.newProduct = data;
    });

    this.activateRouter.params.subscribe((param) => {
      this.product = param;
      this.findProduct();      
    })
  }


  findProduct() {
    this.productService.retraiveProducts();
    this.productService.getProductsObs().subscribe((value) => {
      this.listOfProducts = value
      let index = this.listOfProducts.findIndex((product) => product.id == this.product.id)
      console.log(index)
      this.newProduct = this.listOfProducts[index];
      this.stock = this.newProduct?.stock;
    })
  }

  addCart(newProduct: product, amount: number) {
    const product: product = {
      id: newProduct.id, //PK
      model: newProduct.model,
      idBrand: newProduct.idBrand,
      description: newProduct.description,
      price: newProduct.price,
      stock: newProduct.stock,
      image: newProduct.image,
      quantity: Number(amount),
      createdAt: newProduct.createdAt
    }
    this.cartService.addProduct(product);
    this.amount = 0;
    this.toast.success("Producto Agregado al Carrito");
  }

  getUrl(image: string | undefined) {
    return `${this.myAppUrl}static/${image}`
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

