import { Component, OnInit, TemplateRef } from '@angular/core';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { product } from 'src/app/interfaces/product';
import { ProductService } from 'src/app/services/product.service';


@Component({
  selector: 'app-produc-list',
  templateUrl: './produc-list.component.html',
  styleUrls: ['./produc-list.component.scss']
})
export class ProducListComponent implements OnInit{
  productsRegister: product[] = [];
  product?: product;
  currentPage: number = 1;
  page:number=0;
  totalPages = [];
  active: string =' ';
  disabledNext:string = '';
  disabledBack: string='';
  listProducts: product[] = [];


  constructor(private productoS: ProductService, private modalService: BsModalService) { }

  ngOnInit(): void {
    this.getProductByPage(this.page);
  }


  deleteProducto(indice: number) {

    const produ = this.productsRegister[indice];
    this.productoS.deleteProducto(produ).subscribe({
      complete: () => { this.productoS.retraiveProducts() },
      error: (error) => console.log(error)
    });
    this.modalRef?.hide()


  };

  modalRef?: BsModalRef;
  openModal(template: TemplateRef<any>, index: number) {
    this.product = this.productsRegister[index];
    this.modalRef = this.modalService.show(template);
  }

  openModal2(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);
  }
  getProducts() {
    this.page=-1;
    this.listProducts = [];
    let list: product[] = []
    this.productoS.getProducts().subscribe((data: product[]) => {
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

  getProductByPage(page:number){
    this.page=page
    let object: any;
    this.listProducts = [];
    this.productoS.getProductsByPage(page).subscribe((data: any) => {
      object = data
    });
    
    setTimeout(() => {
      const {total, products} = object
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
