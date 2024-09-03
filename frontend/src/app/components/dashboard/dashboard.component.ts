import { Component, OnInit, TemplateRef } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { product } from 'src/app/interfaces/product';
import { ProductService } from 'src/app/services/product.service';
import { Router } from '@angular/router';
import { environment } from 'src/app/environments/environments';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit {
  private myAppUrl: string = environment.endpoint;
  listProducts: product[] = [];
  public oneProduct: product | undefined;
  modalRef: BsModalRef | undefined;
  errorService: any;
  page:number=0;
  totalPages = [];
  active: string ='active';
  disabledNext:string = '';
  disabledBack: string='';
  object: any;

  constructor(private productService: ProductService,
    private modalService: BsModalService,
    private router: Router) { }

  ngOnInit(): void {

    this.getProductByPage(this.page);
    this.productService.getProductsByPageObs().subscribe((data: any) => {
      this.object = data
    });
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
      this.disabledBack='';
      this.disabledNext='';
      let pagesArray:any = [];
      let i;
      for(i=1; i< total/3; i++){
        pagesArray.push(i);
        
      }
      if(total%3 != 0){
        pagesArray.push(i)
      }
      this.totalPages = pagesArray
      if(page == this.totalPages.length-1){
        this.disabledNext = 'disabled'
      }
      if(page == 0){
        this.disabledBack = 'disabled'
      }
      for (let i = 0; i < products.length; i++) {
        if (products[i].stock > 0) {
          this.listProducts.push(products[i]) //Agregar el producto con stock >0 al arreglo
        }
       
      }
      console.log(this.totalPages)
      console.log(this.listProducts)
    }, 500);
   
    
  }

  sendPage(page:number){
    this.getProductByPage(page);
    console.log(this.listProducts)
  }







}
