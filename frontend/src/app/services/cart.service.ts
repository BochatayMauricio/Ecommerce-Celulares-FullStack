import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class CartService {

  private cartProducts: any[] = [];
  private countSubject: BehaviorSubject<number>;
  private productsSubject: BehaviorSubject<any[]>;

  constructor() {
    this.productsSubject = new BehaviorSubject<any[]>([]);
    this.countSubject = new BehaviorSubject<number>(this.cartProducts.length);
  }

  addProduct(product: any) {
    const index = this.cartProducts.findIndex(element => element.id == product.id);
    console.log(index);
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
  }

  get products() {
    return this.productsSubject.asObservable(); // para poder subscribirse desde fuera
  }

  get countProd() {
    return this.countSubject.asObservable();
  }

  deleteProduct(id: number) {
    const index = this.cartProducts.findIndex(prod => prod.id === id);
    if (index > -1) {
      this.cartProducts.splice(index, 1);
      this.productsSubject.next(this.cartProducts);
    }
    this.countSubject.next(this.cartProducts.length);
  }

  clearCart() {
    this.cartProducts = [];
    this.productsSubject.next(this.cartProducts);
    this.countSubject.next(this.cartProducts.length);
  }
}