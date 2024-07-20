import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { product } from '../interfaces/product';


@Injectable({
  providedIn: 'root'
})
export class CartService {

  private cartProducts: product[] = [];
  private countSubject: BehaviorSubject<number>;
  private productsSubject: BehaviorSubject<product[]>;

  constructor() {
    this.getStoradgeCart()
    if(!this.cartProducts){
      this.productsSubject = new BehaviorSubject<product[]>([]);
    }
    else{
      this.productsSubject = new BehaviorSubject<product[]>(this.cartProducts);
    }
    this.countSubject = new BehaviorSubject<number>(this.cartProducts.length);
  }

  addProduct(product: product) {
    const index = this.cartProducts.findIndex(element => element.id == product.id);
    if (index == -1) {
      this.cartProducts.push(product);
    } else {
      let update = this.cartProducts[index];
      update.quantity = Number(update.quantity) + Number(product.quantity);
      this.cartProducts.splice(index, 1);
      this.cartProducts.push(update);
    }
    this.productsSubject.next(this.cartProducts);
    this.countSubject.next(this.cartProducts.length);
    this.storadgeCart(this.cartProducts)
  }

  get products() {
    return this.productsSubject.asObservable(); 
  }

  get countProd() {
    return this.countSubject.asObservable();
  }

  deleteProduct(id: number) {
    const index = this.cartProducts.findIndex(prod => prod.id === id);
    if (index > -1) {
      this.cartProducts.splice(index, 1);
      this.productsSubject.next(this.cartProducts);
      this.storadgeCart(this.cartProducts);
    }
    this.countSubject.next(this.cartProducts.length);
  }

  clearCart() {
    this.cartProducts = [];
    this.productsSubject.next(this.cartProducts);
    this.countSubject.next(this.cartProducts.length);
    localStorage.removeItem("cart")
  }

  storadgeCart(products:product[]){
    localStorage.setItem("cart",JSON.stringify(products))
  }

  getStoradgeCart(){
    let storadge = localStorage.getItem("cart")
    if(storadge != null){
      this.cartProducts = JSON.parse(storadge)
    }
  }
}