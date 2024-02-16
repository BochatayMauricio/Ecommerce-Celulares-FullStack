import { Component, ElementRef, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AlertComponent } from 'ngx-bootstrap/alert';
import { ProductService } from 'src/app/services/product.service';
import { UserService } from 'src/app/services/user.service';



@Component({
  selector: 'app-formulario-registro',
  templateUrl: './formulario-registro.component.html',
  styleUrls: ['./formulario-registro.component.scss']
})
export class FormularioRegistroComponent  {
  @Output() hideModal = new EventEmitter<boolean>();
  //PARTE DEL ALERT
  alerts: any[] = [];
  Admin: any;

  //FORMULARIO Y USO DE SERVICE
  productForm: FormGroup;
  constructor(private productoS: ProductService, public fb: FormBuilder, private userService: UserService) {
    this.productForm = this.fb.group({
      model: ['', [Validators.required]],
      brand: ['', [Validators.required]],
      price: ['', [Validators.required]],
      stock: ['', [Validators.required]],
      description: ['', [Validators.required]],
      file: [null, [Validators.required]]

    });
    
    this.userService.getThisUserBehaviour().subscribe((value) => this.Admin = value);
  }
  imageBlob: File | undefined;
  @ViewChild('fileInput', { static: false })
  fileInput!: ElementRef;

  onFileUpload() {
    this.imageBlob = this.fileInput.nativeElement.files[0];
    this.productForm.patchValue({
      file: this.imageBlob
    });
    this.productForm.get('file')?.updateValueAndValidity();
  }

  registrarForm() {
    const formData = new FormData();
    formData.append('model', this.productForm.get('model')?.value);
    formData.append('brand', this.productForm.get('brand')?.value);
    formData.append('description', this.productForm.get('description')?.value);
    formData.append('price', this.productForm.get('price')?.value);
    formData.append('stock', this.productForm.get('stock')?.value);
    formData.append('file', this.productForm.get('file')?.value);
    this.productoS.postProducto(formData, this.Admin.id).subscribe({
      complete: () => {
        this.productoS.retraiveProducts();
        this.alerts.push({
          type: 'info',
          msg: `Producto registrado correctamente (added: ${new Date().toLocaleTimeString()})`,
          timeout: 3000
        });
        this.hideModal.emit(true);
      },
      error: (error) => {
        alert('No se pudo registrar el producto')
        console.log(error)
      }
    });
  }
  
  onClosed(dismissedAlert: AlertComponent): void {
    this.alerts = this.alerts.filter(alert => alert !== dismissedAlert);
  }
}

