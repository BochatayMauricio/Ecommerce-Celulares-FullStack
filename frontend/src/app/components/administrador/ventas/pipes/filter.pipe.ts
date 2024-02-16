import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {

  transform(value: any, arg:any): any {
    if(arg===''){
      return value
    }else{
      const resultSales=[];
      for(const sales of value){
        if(sales.dni.toString().indexOf(arg) > -1){   //ver porque me tira error al usar indexOf
        resultSales.push(sales);
        }
      }
      return resultSales;
    }
  }
}
