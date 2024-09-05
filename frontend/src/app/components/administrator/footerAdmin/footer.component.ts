import { Component, OnInit } from '@angular/core';
import { SalesService } from '../../../services/sales.service';
import { CustomerService } from 'src/app/services/customer.service';
import { ProductService } from 'src/app/services/product.service';
import { catchError, map } from 'rxjs';

@Component({
  selector: 'app-footerAdmin',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterAdminComponent implements OnInit {
  countProducts: number = 0;
  countCustomers: number = 0;
  countSales:number = 0;
  fecha: string = new Date().toLocaleDateString('en-GB');
  constructor(private productoS: ProductService, private customers: CustomerService, private sales: SalesService) { }
  ngOnInit(): void {
    this.productoS.retraiveProducts();
    this.productoS.getProductsObs().subscribe(response => this.countProducts = response.length);
    this.customers.getCustomers().subscribe(response => this.countCustomers = response.length);
    this.sales.getSales()
      .subscribe({
       next:(value)=> this.countSales = value.length
      })
  }
}
