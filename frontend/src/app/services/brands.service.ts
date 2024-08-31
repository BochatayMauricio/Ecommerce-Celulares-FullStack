import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../environments/environments';
import { brand } from '../interfaces/brand';
import { catchError, map, Observable, of } from 'rxjs';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class BrandsService {
  myAppUrl = environment.endpoint;
  myApiUrl = 'api/brands/';
  // brands:brand[]=[];
  constructor(private http: HttpClient,private toastr: ToastrService) {}

   getBrands():Observable<brand[]>{
     return this.http.get<brand[]>(`${this.myAppUrl}${this.myApiUrl}/getAll`);
   }

  postBrand(brand: brand) {
    return this.http.post(`${this.myAppUrl}${this.myApiUrl}`, brand);
  }


  
}
