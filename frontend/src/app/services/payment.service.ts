import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { sales } from '../interfaces/sales';
import { environment } from '../environments/environments';

@Injectable({
  providedIn: 'root'
})
export class PaymentService {

  private api = environment.endpoint;
  constructor(private http: HttpClient) { }

  chargePayment(sell:sales[],tokenID:string){
    return this.http.post(`${this.api}api/payment/checkout`,{
      sales: sell,
      tokenID: tokenID
    });
  }

}
