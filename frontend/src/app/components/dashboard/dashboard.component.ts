import { Component, OnInit, TemplateRef } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { product } from 'src/app/interfaces/product';
import { ProductService } from 'src/app/services/product.service';
import { Router } from '@angular/router';
import { environment } from 'src/app/environments/environments';

interface responseProductPaginate{
  total:number,
  products: product[]
}

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit {
  myAppUrl: string = environment.endpoint;
  listProducts: product[] = [];
  modalRef?:BsModalRef;
  page:number=0;
  totalPages:number[] = [];
  disabledNext:boolean = false;
  disabledBack: boolean=true;
  object!:responseProductPaginate;

  constructor(private productService: ProductService,
    private modalService: BsModalService,
    private router: Router) { }

  ngOnInit(): void {
    this.getProductByPage(this.page);
    this.productService.getProductsByPageObs().subscribe((data) => {
      this.object = data
    });
    this.disabledNext = false;
  }

  getProducts() {
    this.page=-1;
    this.listProducts = [];
    let list: product[] = [];
    this.productService.retraiveProducts();
    this.productService.getProductsObs().subscribe((data: product[]) => {
      list = data;
    });
    setTimeout(() => {
      for (let i = 0; i < list.length; i++) {
        if (list[i].stock > 0) {
          this.listProducts.push(list[i]) //Agregar el producto con stock >0 al arreglo
        }
      }
    }, 500);

  }

  findProduct(item: product) {
    this.productService.setProduct(item);
    this.router.navigate([`dashboard/shopping/${item.id}`])
  }

  productInfo(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);
  }


  getUrl(image: string) {
    return `${this.myAppUrl}static/${image}`
  }

 
  getProductByPage(page:number){
    this.page=page

    this.listProducts = [];
    this.productService.getProductsByPage(page);
    
    setTimeout(() => {
      const {total, products} = this.object
      this.disabledBack=false;
      this.disabledNext=false;
      let pagesArray:number[] = [];
      let i;
      for(i=1; i< total/3; i++){
        pagesArray.push(i);
        
      }
      if(total%3 != 0){
        pagesArray.push(i)
      }
      this.totalPages = pagesArray
      if(page == this.totalPages.length-1){
        this.disabledNext = true
      }
      if(page == 0){
        this.disabledBack = true
      }
      for (let i = 0; i < products.length; i++) {
        if (products[i].stock > 0) {
          this.listProducts.push(products[i]) //Agregar el producto con stock >0 al arreglo
        }
       
      }
    }, 500);
   
    
  }

  sendPage(page:number){
    this.getProductByPage(page);
  }







}
