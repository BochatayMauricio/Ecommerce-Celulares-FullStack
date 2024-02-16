import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { product } from 'src/app/interfaces/product';
import { ToastrService } from 'ngx-toastr';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-formulario-modificar',
  templateUrl: './formulario-modificar.component.html',
  styleUrls: ['./formulario-modificar.component.scss']
})
export class FormularioModificarComponent implements OnInit {
  constructor(private productoS: ProductService, private toastr: ToastrService) { }
  @Input() productReceived: any;
  @Output() hideModal = new EventEmitter<boolean>();
  ngOnInit(): void {

  };

  updateProducto(price: any, stock: any, description: any) {
    if(price.value == '' && stock.value == '' && description.value == ''){
      this.toastr.info('No realizaste ningun cambio !').message;
    }else{
      const productModify: product = {
      id: this.productReceived.id,
      model: this.productReceived.model,
      brand: this.productReceived.brand,
      price: price.value || this.productReceived.price,
      stock: stock.value || this.productReceived.stock,
      description: description.value || this.productReceived.description,
      createdAt: this.productReceived.createdAt,
      quantity:this.productReceived.quantity,
      image: this.productReceived.image
    }
    this.productoS.updateProduct(productModify).subscribe({
      complete: () => {
        this.productoS.retraiveProducts();
        this.toastr.success('Producto Actualizado');
        this.hideModal.emit(true);
      },
      error: (err) => this.toastr.error('No se realizo correctamente la modificacion',err)
    });
    }
  }

  getUrl(image: string) {
    return `http://localhost:3001/static/${image}`
  }
}
