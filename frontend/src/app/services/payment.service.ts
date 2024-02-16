import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { sales } from '../interfaces/sales';


@Injectable({
  providedIn: 'root'
})
export class PaymentService {


  constructor(private http: HttpClient) { }

  chargePayment(sell:sales[],tokenID:string){
    return this.http.post('http://localhost:3001/api/payment/checkout',{
      sales: sell,
      tokenID: tokenID
    });
  }

}
