import { Component, inject,Input,OnInit, TemplateRef} from '@angular/core';
import { DomicileService } from 'src/app/services/domicile.service';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { domicile } from 'src/app/interfaces/domicile';
import { sales } from 'src/app/interfaces/sales';
import { CartService } from 'src/app/services/cart.service';
import { ToastrService } from 'ngx-toastr';
import { SalesService } from 'src/app/services/sales.service';
import { product } from 'src/app/interfaces/product';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { user } from 'src/app/interfaces/user';
import { UserService } from 'src/app/services/user.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-purchase',
  templateUrl: './purchase.component.html',
  styleUrls: ['./purchase.component.css']
})
export class PurchaseComponent implements OnInit {
  formGroup?:FormGroup
  oneAtATime = true;
  collapsed=false;
  component:string="purchase";
  domicile!:domicile; //tambien cambie este tipado
  idDomicile?:number;
  data?:domicile;
  cartSales: sales[] = [];
  productsCart: product[] = [];
  modalRef?: BsModalRef; //probar si funciona con este tipado
  user?: user;
  endCollapsed=true;
  selectedSucursal:number=0;
  
  constructor(
    private domicileService: DomicileService, 
    private cartService: CartService, 
    private toastr:ToastrService,
    private salesService: SalesService,
    private modalService: BsModalService,
    private userService:UserService,
    private router: Router,
    private fb: FormBuilder
  ){}

  ngOnInit(): void{
    this.formGroup = this.fb.group({
      codPos: ['', [Validators.required]],
      calle: ['', [Validators.required]],
      numero: ['',[Validators.required]]
    }) 

    this.cartService.products.subscribe((products) => {
      this.productsCart = products
    });
    this.userService.getThisUserBehaviour().subscribe(value => this.user = value);
  }

  setDomicile(){
    this.domicile = {
      id:0,
      postalCode: this.formGroup!.value.codPos,
      street: this.formGroup!.value.calle,
      number: this.formGroup!.value.numero
    } 
    this.domicileService.setDomicile(this.domicile).subscribe((data)=> {
      this.data = data;
      this.idDomicile = this.data.id; 
      this.createSalesWithProductsCart();
    })
  }


  setSucursal(template: TemplateRef<any>) {
    const form:any = document.getElementById('sucursales');
    const formData = new FormData(form);
    this.selectedSucursal = parseInt(String(formData.get('sucursal'))) ;
    if(!this.selectedSucursal){
      this.toastr.info("Primero debe seleccionar una sucursal ")
      return
    } else {    
        this.domicileService.getOneDomicile(this.selectedSucursal).subscribe((data)=> {
          this.domicile = data;
          this.idDomicile=this.domicile.id  
          this.createSalesWithProductsCart();
          this.openModal(template)     
        })
        this.endCollapsed = !this.endCollapsed
    }
}

doSell($event: any) {
  if ($event.status == "succeeded") {
    this.modalRef?.hide();
    if (this.cartSales.length > 0) {
      if (this.cartSales.length < this.productsCart.length) {
        this.toastr.info('Hay productos que no cumplen con el stock, por lo tanto no concretarán la compra').onAction
      }
      this.salesService.postSell(this.cartSales).subscribe({
        complete: (() => {
          this.cartService.clearCart();
          this.toastr.success('Compra registrada con exito!')
        }),
        error: (() => this.toastr.error('Ocurrio un error'))
      });
    }
    else {
      this.toastr.error('Ningun producto cumple con el stock').onAction;
    }
  } else {
    this.toastr.error('Hubo un inconveniente con la transacción del pago').onAction;
  }
}

openModal(template: TemplateRef<any>) {
  
  this.modalRef = this.modalService.show(template);
}


createSalesWithProductsCart() {
  if (this.user?.id) {
    const cartSell: sales[] = [];
    for (let i = 0; i < this.productsCart.length; i++) {
      const newSale: sales = {
        idCustomer: this.user.id,
        idProduct: this.productsCart[i].id,
        idDomicile:this.idDomicile!, //Hay que agregar que te devuelva el domicilio para hacer la venta
        quantity: Number(this.productsCart[i].quantity),
        idShipping: null
      };
      if (this.productsCart[i].stock >= Number(this.productsCart[i].quantity)) {
        cartSell.push(newSale);
      } else {
        this.toastr.info(`El producto: ${this.productsCart[i].brand}--${this.productsCart[i].model} no cumple con el stock para esta compra`).onAction
      }
    }
    this.cartSales=cartSell;
  } else {
    let confirmar = confirm('Antes de Comprar debe Loguearse. Quiere que lo redireccionemos al LogIn?');
    if (confirmar) {
      this.router.navigate(['/login'])
    }
  }

}

}
