import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../environments/environments';
import { sales } from '../interfaces/sales';
import { BehaviorSubject, catchError, EMPTY } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SalesService {

  private myAppUrl: string;
  private myApiUrl: string;

  sales: sales[] = [];
  salesCustomer: sales[] = [];
  private sell: BehaviorSubject<sales[]> = new BehaviorSubject<sales[]>([]);
  private sellCustomer: BehaviorSubject<sales[]> = new BehaviorSubject<sales[]>([]);


  constructor(private http: HttpClient) {
    this.myAppUrl = environment.endpoint;
    this.myApiUrl = 'api/sales'
  }

  getSales() {
    this.http.get<sales[]>(`${this.myAppUrl}${this.myApiUrl}`)
    .subscribe(sales => {
      this.sales = sales;
      this.sell.next(this.sales)
    });
    return this.sell.asObservable()
  }

  getSalesCustomer(dni: string) {
    const dniCustomer = dni.valueOf
    this.http.get<sales[]>(`${this.myAppUrl}${this.myApiUrl}/${dniCustomer}`).subscribe(sales => {
      this.salesCustomer = sales;
      this.sellCustomer.next(this.salesCustomer)
    });
    return this.sellCustomer.asObservable()
  }

  postSell(cartSell: sales[]) {
    return this.http.post(`${this.myAppUrl}${this.myApiUrl}`,cartSell)
  }


  
}
