import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../environments/environments';
import { domicile } from '../interfaces/domicile';

@Injectable({
  providedIn: 'root'
})
export class DomicileService {
  myAppUrl:string;
  myApiUrl:string;

  constructor(private http: HttpClient) {
    this.myAppUrl = environment.endpoint;
    this.myApiUrl = 'api/domicile'

   }

   setDomicile(domicile:domicile){
    return this.http.post<domicile>(`${this.myAppUrl}${this.myApiUrl}`,domicile)
   }
   getOneDomicile(id:number){
    return this.http.get<domicile>(`${this.myAppUrl}${this.myApiUrl}/${id}`)
   }
}
