import { Component, OnInit, ViewChild } from '@angular/core';
import { SalesService } from '../../../../services/sales.service';
import { sales } from 'src/app/interfaces/sales';

@Component({
  selector: 'app-sales-list',
  templateUrl: './sales-list.component.html',
  styleUrls: ['./sales-list.component.scss']
})
export class SalesListComponent implements OnInit{
   salesList: sales[]=[]
  constructor(private salesS: SalesService){}
  filterSales = '';
  ngOnInit():void{
    this.salesS.getSales().subscribe((response)=>{
      this.salesList = response;
    });
  }
  
}
