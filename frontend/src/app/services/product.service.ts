import { EventEmitter, Injectable, Output } from '@angular/core';
import { BehaviorSubject, catchError, of } from 'rxjs';
import { environment } from '../environments/environments';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { product } from '../interfaces/product';

interface responseProductPaginate {
  total:number,
  products: product[]
}

@Injectable({
  providedIn: 'root'
})
export class ProductService {


  productos: product[] = [];
  private prod: BehaviorSubject<product[]> = new BehaviorSubject<product[]>([]); //el que estaba antes de paginar
  private productsPaginated: BehaviorSubject<responseProductPaginate> = new BehaviorSubject<responseProductPaginate>({total:0,products:[]});

  nullproduct?: product
  private productInfo: BehaviorSubject<product> = new BehaviorSubject<product>(this.nullproduct!);

  setProduct(newProduct: product) {
    this.productInfo.next(newProduct);
  }

  getProduct() {
    return this.productInfo.asObservable();
  }

  
  @Output() triggerProductInfo: EventEmitter<any> = new EventEmitter();
  private myAppUrl: string;
  private myApiUrl: string;

  constructor(private http: HttpClient) {
    this.myAppUrl = environment.endpoint;
    this.myApiUrl = 'api/products';
  }

  getProductsByPage(page:number) {
    this.http.get<responseProductPaginate>(`${this.myAppUrl}${this.myApiUrl}/page/${page}`)
    .subscribe((value)=>{
      this.productsPaginated.next(value);
    })
  }

  getProductsByPageObs(){
    return this.productsPaginated.asObservable()
  }

  getProductsByName(name: string): Observable<product[]> {
    return this.http.get<product[]>(`${this.myAppUrl}${this.myApiUrl}/pbn/${name}`)
  }

  postProducto(formDataProduct: FormData, idAdmin: number) {
    return this.http.post(`${this.myAppUrl}${this.myApiUrl}/${idAdmin}`, formDataProduct);
  }
  
  //ver porque no se usa
  retraiveProducts() {
    this.http.get<product[]>(`${this.myAppUrl}${this.myApiUrl}`)
    .subscribe(products => {
      this.productos = products;
      this.prod.next(this.productos)
    });
  }

  getProductsObs(){
    return this.prod.asObservable();
  }

  deleteProducto(producto: product) {
    const id = producto.id;
    return this.http.delete(`${this.myAppUrl}${this.myApiUrl}/${id}`);
  }

  updateProduct(productModify: product) {
    const id = productModify.id
    return this.http.put(`${this.myAppUrl}${this.myApiUrl}/${id}`, productModify)
  }

}
