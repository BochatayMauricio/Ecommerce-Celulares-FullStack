import { Component, OnInit, TemplateRef } from '@angular/core';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { product } from 'src/app/interfaces/product';
import { ProductService } from 'src/app/services/product.service';


@Component({
  selector: 'app-produc-list',
  templateUrl: './produc-list.component.html',
  styleUrls: ['./produc-list.component.scss']
})
export class ProducListComponent implements OnInit {
  productosRegistrados: product[] = [];
  product: any;
  constructor(private productoS: ProductService, private modalService: BsModalService) { }

  ngOnInit(): void {
    this.productoS.retraiveProducts().subscribe(respuesta => this.productosRegistrados = respuesta);
  }

  deleteProducto(indice: number) {

    const produ = this.productosRegistrados[indice];
    this.productoS.deleteProducto(produ).subscribe({
      complete: () => { this.productoS.retraiveProducts() },
      error: (error) => console.log(error)
    });
    this.modalRef?.hide()


  };

  modalRef?: BsModalRef;
  openModal(template: TemplateRef<any>, index: number) {
    this.product = this.productosRegistrados[index];
    this.modalRef = this.modalService.show(template);
  }

  openModal2(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);
  }
}
