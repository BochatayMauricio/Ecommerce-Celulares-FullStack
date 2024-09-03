import { Component, inject,Input,OnInit} from '@angular/core';
import { DomicileService } from 'src/app/services/domicile.service';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { domicile } from 'src/app/interfaces/domicile';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { CartService } from 'src/app/services/cart.service';
import { SalesService } from 'src/app/services/sales.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import { sales } from 'src/app/interfaces/sales';
import { user } from 'src/app/interfaces/user';
import { product } from 'src/app/interfaces/product';
import { timeout } from 'rxjs';
import { ProductService } from 'src/app/services/product.service';


@Component({
  selector: 'app-purchase',
  templateUrl: './purchase.component.html',
  styleUrls: ['./purchase.component.css']
})
export class PurchaseComponent implements OnInit {
  @Input() productsCart!:product[];

  private fb = inject(FormBuilder);
  formGroup?:FormGroup
  oneAtATime = true;
  collapsed=false;
  endCollapsed=true;
  component:string="purchase";
  domicile?:any;
  idDomicile?:number=0;
  data:any;
  selectedSucursal:number=0;

  
  modalRef?: BsModalRef;

  cartSales: sales[] = [];
  user?: user;


  constructor(private domicileService: DomicileService,
    private cartService: CartService, private sellService: SalesService, private alertService: ToastrService, private router: Router,
    private userService: UserService  
  ){
  }

  ngOnInit(): void{
    this.formGroup = this.fb.group({
      codPos: ['', [Validators.required]],
      calle: ['', [Validators.required]],
      numero: ['',[Validators.required]]
    }) 
    this.cartService.products.subscribe((data:any) => {
      this.productsCart = data
      console.log(this.productsCart) 
    })
    this.userService.getThisUserBehaviour().subscribe(value => this.user = value)
    console.log(this.user)
   
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
      console.log(this.idDomicile);
      this.chargeCart()
    })
    
  }


  setSucursal() {
    const form:any = document.getElementById('sucursales');
    const formData = new FormData(form);
    this.selectedSucursal = parseInt(String(formData.get('sucursal'))) ;
    if(!this.selectedSucursal){
      alert("Primero debe seleccionar una sucursal ")
      return
    } else {    
        this.domicileService.getOneDomicile(this.selectedSucursal).subscribe((data)=> {
          this.domicile = data;
          this.idDomicile=this.domicile.id       
        })
        this.endCollapsed = !this.endCollapsed
    }
  }


show(){
  alert("Aca va la compra")
}

async chargeCart() {
  console.log("Id usuario",this.user?.id)
  console.log("Id Domicilio",this.idDomicile)
  if (this.user?.id) {
    const cartSell: sales[] = [];
    for (let i = 0; i < this.productsCart.length; i++) {
      const newSale: sales = {
        idCustomer: this.user.id,
        idProduct: this.productsCart[i].id,
        idDomicile: this.idDomicile!, //Hay que agregar que te devuelva el domicilio para hacer la venta
        quantity: Number(this.productsCart[i].quantity),
        idShipping: null
      };
      if (this.productsCart[i].stock >= Number(this.productsCart[i].quantity)) {
        cartSell.push(newSale);
      } else {
        this.alertService.info(`El producto: ${this.productsCart[i].brand}--${this.productsCart[i].model} no cumple con el stock para esta compra`).onAction
      }
    }
    this.cartSales = cartSell;
    console.log(cartSell)
  } else {
    let confirmar = confirm('Antes de Comprar debe Loguearse. Quiere que lo redireccionemos al LogIn?');
    if (confirmar) {
      this.router.navigate(['/login'])
    }

  }
}


doSell($event: any) {
  if ($event.status == "succeeded") {
    this.modalRef?.hide();
    if (this.cartSales.length > 0) {
      if (this.cartSales.length < this.productsCart.length) {
        this.alertService.info('Hay productos que no cumplen con el stock, por lo tanto no concretarán la compra').onAction

      }
      console.log("Antes de postear la Sell",this.cartSales)
      this.sellService.postSell(this.cartSales).subscribe({
        complete: (() => {
          this.cartService.clearCart();
          this.alertService.success('Compra registrada con exito!')
          setTimeout(() => {
            this.router.navigateByUrl(`/dashboard/user-purchases/${this.user?.id}`)
          }, 500);
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


}



