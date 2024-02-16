import { EventEmitter, Injectable, Output } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { environment } from '../environments/environments';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { product } from '../interfaces/product';



@Injectable({
  providedIn: 'root'
})
export class ProductService {


  productos: any = [];
  private prod: BehaviorSubject<product[]> = new BehaviorSubject<product[]>([]);

  nullproduct: product = {
    id: 0,
    model: '',
    brand: '',
    description: '',
    price: 0,
    stock: 0,
    image: '',
    quantity: null,
    createdAt: new Date()
  }
  private productInfo: BehaviorSubject<product> = new BehaviorSubject<product>(this.nullproduct);

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
    this.myApiUrl = 'api/products'
  }

  getProducts(): Observable<product[]> {
    return this.http.get<product[]>(`${this.myAppUrl}${this.myApiUrl}`)
  }

  getProductsByName(name: string): Observable<product[]> {
    return this.http.get<product[]>(`${this.myAppUrl}${this.myApiUrl}/pbn/${name}`)
  }

  //PART OF ADMINISTRATOR

  postProducto(formDataProduct: FormData, idAdmin: number) {
    return this.http.post(`${this.myAppUrl}${this.myApiUrl}/${idAdmin}`, formDataProduct);
  }

  retraiveProducts() {
    this.http.get(`${this.myAppUrl}${this.myApiUrl}`).subscribe(products => {
      this.productos = products;
      this.prod.next(this.productos)
    });
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
