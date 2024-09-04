import { Component, inject,Input,OnInit, TemplateRef} from '@angular/core';
import { DomicileService } from 'src/app/services/domicile.service';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { domicile } from 'src/app/interfaces/domicile';
import { sales } from 'src/app/interfaces/sales';
import { CartService } from 'src/app/services/cart.service';
import { ToastrService } from 'ngx-toastr';
import { SalesService } from 'src/app/services/sales.service';
import { product } from 'src/app/interfaces/product';
import { BsModalService } from 'ngx-bootstrap/modal';
import { user } from 'src/app/interfaces/user';
import { UserService } from 'src/app/services/user.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-purchase',
  templateUrl: './purchase.component.html',
  styleUrls: ['./purchase.component.css']
})
export class PurchaseComponent implements OnInit {
  private fb = inject(FormBuilder);
  formGroup?:FormGroup
  oneAtATime = true;
  collapsed=false;
  component:string="purchase";
  domicile?:domicile;
  idDomicile?:number;
  data:any;
  cartSales: sales[] = [];
  productsCart: product[] = [];
  modalRef: any;
  user?: user;
  
  //@Input() cartSales!:sales[];
  constructor(private domicileService: DomicileService, 
    private cartService: CartService, 
    private alertService:ToastrService,
    private salesService: SalesService,
    private modalService: BsModalService,
    private userService:UserService,
    private router: Router
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
    this.createSalesWithProductsCart();
  }

  setDomicile(){
    // Se setean los datos del formulario a la variable domicilio
    this.domicile = {
      id:0,
      postalCode: this.formGroup!.value.codPos,
      street: this.formGroup!.value.calle,
      number: this.formGroup!.value.numero
    } 
    // Llamamos al servicio para que registre el domicilio en la BD y guarde el id del Domicilio
    this.domicileService.setDomicile(this.domicile).subscribe((data)=> {
      this.data = data;
      this.idDomicile = this.data.id;
      console.log(this.idDomicile) 
    })
  }


  setSucursal() {
    const form:any = document.getElementById('sucursales');
    // Verifica que el elemento con el id 'sucursales' existe
    if (!form) {
        console.error('El formulario no se encuentra.');
        return;
    } else{
      const formData = new FormData(form);
      const selectedSucursal = formData.get('sucursal');
      console.log('Sucursal Seleccioada: ' + selectedSucursal);
      return selectedSucursal
    }
}

doSell($event: any) {
  if ($event.status == "succeeded") {
    this.modalRef?.hide();
    if (this.cartSales.length > 0) {
      if (this.cartSales.length < this.productsCart.length) {
        this.alertService.info('Hay productos que no cumplen con el stock, por lo tanto no concretarán la compra').onAction
      }
      this.salesService.postSell(this.cartSales).subscribe({
        complete: (() => {
          this.cartService.clearCart();
          this.alertService.success('Compra registrada con exito!')
        }),
        error: (() => this.alertService.error('Ocurrio un error'))
      });
    }
    else {
      this.alertService.error('Ningun producto cumple con el stock').onAction;
    }
  } else {
    this.alertService.error('Hubo un inconveniente con la transacción del pago').onAction;
  }
}

openModal(template: TemplateRef<any>) {
  
  this.modalRef = this.modalService.show(template);
}


async createSalesWithProductsCart() {
  console.log(this.user?.id)
  console.log(this.productsCart);
  if (this.user?.id) {
    const cartSell: sales[] = [];
    for (let i = 0; i < this.productsCart.length; i++) {
      const newSale: sales = {
        idCustomer: this.user.id,
        idProduct: this.productsCart[i].id,
        idDomicile:this.idDomicile || 1, //Hay que agregar que te devuelva el domicilio para hacer la venta
        quantity: Number(this.productsCart[i].quantity),
        idShipping: null
      };
      if (this.productsCart[i].stock >= Number(this.productsCart[i].quantity)) {
        cartSell.push(newSale);
      } else {
        this.alertService.info(`El producto: ${this.productsCart[i].brand}--${this.productsCart[i].model} no cumple con el stock para esta compra`).onAction
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
