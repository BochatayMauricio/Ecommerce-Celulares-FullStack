import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../environments/environments';
import { sales } from '../interfaces/sales';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SalesService {

  private myAppUrl: string;
  private myApiUrl: string;

  sales: any = [];
  salesCustomer: any = [];
  private sell: BehaviorSubject<any[]> = new BehaviorSubject<any[]>([]);
  private sellCustomer: BehaviorSubject<sales[]> = new BehaviorSubject<sales[]>([]);


  constructor(private http: HttpClient) {
    this.myAppUrl = environment.endpoint;
    this.myApiUrl = 'api/sales'
  }

  getSales() {
    this.http.get(`${this.myAppUrl}${this.myApiUrl}`).subscribe(sales => {
      this.sales = sales;
      this.sell.next(this.sales)
    });
    return this.sell.asObservable()
  }

  getSalesCustomer(dni: any) {
    const dniCustomer = dni.value
    this.http.get(`${this.myAppUrl}${this.myApiUrl}/${dniCustomer}`).subscribe(sales => {
      this.salesCustomer = sales;
      this.sellCustomer.next(this.salesCustomer)
    });
    return this.sellCustomer.asObservable()
  }

  postSell(cartSell: sales[]) {
    return this.http.post(`${this.myAppUrl}${this.myApiUrl}`,cartSell)
  }


  
}
