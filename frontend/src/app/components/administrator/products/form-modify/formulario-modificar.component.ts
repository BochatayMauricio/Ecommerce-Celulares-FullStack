import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { product } from 'src/app/interfaces/product';
import { ToastrService } from 'ngx-toastr';
import { ProductService } from 'src/app/services/product.service';
import { environment } from 'src/app/environments/environments';

@Component({
  selector: 'app-formulario-modificar',
  templateUrl: './formulario-modificar.component.html',
  styleUrls: ['./formulario-modificar.component.scss']
})
export class FormularioModificarComponent implements OnInit {
  constructor(private productoS: ProductService, private toastr: ToastrService) { }
  @Input() productReceived!: product;
  @Output() hideModal = new EventEmitter<boolean>();
  @Output() updatedSuccess = new EventEmitter<boolean>();

  ngOnInit(): void {  };
  myAppUrl:string = environment.endpoint;
  updateProducto(price: HTMLInputElement, stock: HTMLInputElement, description: HTMLTextAreaElement) {
    if(price.value == '' && stock.value == '' && description.value == ''){
      this.toastr.info('No realizaste ningun cambio !').message;
    }else{
      const productModify: product = {
      id: this.productReceived.id,
      model: this.productReceived.model,
      idBrand: this.productReceived.idBrand,
      price: Number(price.value) || this.productReceived.price,
      stock: Number(stock.value) || this.productReceived.stock,
      description: description.value || this.productReceived.description,
      createdAt: this.productReceived.createdAt,
      quantity:this.productReceived.quantity,
      image: this.productReceived.image
    }
    this.productoS.updateProduct(productModify).subscribe({
      next: () => {
        this.updatedSuccess.emit(true);
        this.toastr.success('Producto Actualizado');
        this.hideModal.emit(true);
      },
      error: (err) => this.toastr.error('No se realizo correctamente la modificacion',err)
    });
    }
  }

  getUrl(image: string) {
    return `${this.myAppUrl}static/${image}`
  }
}
