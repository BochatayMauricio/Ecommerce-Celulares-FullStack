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


  constructor(private productoS: ProductService, private modalService: BsModalService) { }

  ngOnInit(): void {
    this.productoS.retraiveProducts().subscribe(response => this.productsRegister = response);
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
}
