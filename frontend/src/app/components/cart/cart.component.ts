import { Component, EventEmitter, Input, OnInit, Output, TemplateRef } from '@angular/core';
import { CartService } from 'src/app/services/cart.service';
import { sales } from 'src/app/interfaces/sales';
import { SalesService } from '../../services/sales.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { user } from 'src/app/interfaces/user';
import { UserService } from 'src/app/services/user.service';
import { environment } from 'src/app/environments/environments';
import { HttpClient } from '@angular/common/http';
import { product } from 'src/app/interfaces/product';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit{
  @Input() component?: string;
  @Output() products: EventEmitter<product[]> = new EventEmitter<product[]>();;

  hideModal = false;
  modalRef?: BsModalRef;
  responsePayment: any;
  buttonDisable: boolean = false;
  productsCart: any[] = [];
  cartSales: sales[] = [];
  user?: user;


  private myAppUrl: string = environment.endpoint;
  constructor(private modalService: BsModalService, private cartService: CartService, private sellService: SalesService, private alertService: ToastrService, private router: Router, private userService: UserService) {

  }
  ngOnInit() {
    console.log(this.user)
    this.cartService.products.subscribe((products) => {
      this.productsCart = products;
      console.log(this.productsCart)
    });
    this.userService.getThisUserBehaviour().subscribe(value => this.user = value)
  
  }


  deleteProduct(id: number) {
    this.cartService.deleteProduct(id);
  }

  async chargeCart(template: any) {
    console.log(this.user?.id)
    if (this.user?.id) {
      const cartSell: sales[] = [];
      for (let i = 0; i < this.productsCart.length; i++) {
        const newSale: sales = {
          idCustomer: this.user.id,
          idProduct: this.productsCart[i].id,
          idDomicile:0, //Hay que agregar que te devuelva el domicilio para hacer la venta
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
      this.openModal(template);
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
        this.sellService.postSell(this.cartSales).subscribe({
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
  openModal2(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);
  }

  getUrl(image: string) {
    return `${this.myAppUrl}static/${image}`
  }

  clearCart(){
    this.cartService.clearCart()
  }

}