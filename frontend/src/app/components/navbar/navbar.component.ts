import {  Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { product } from 'src/app/interfaces/product';
import { user } from 'src/app/interfaces/user';
import { CartService } from 'src/app/services/cart.service';
import { UserService } from 'src/app/services/user.service';
import { __param } from 'tslib';


@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  countProduct = 0;
  pay: boolean = false;
  user!: user;
  login: boolean = false;
  isCollapsed = true;
  infoRosarioCelu = true;
  productList: product[] = [];
  productString: string = '';
  search: string = '';
 


  constructor(private router: Router, private cartService: CartService, private toastr: ToastrService, private userService: UserService) {
    
  }

  @Output() seachEvent = new EventEmitter<boolean>(false);

  ngOnInit(): void {
    let token = this.userService.getToken();
    this.userService.getThisUserBehaviour().subscribe(value => this.user = value);
    if (token) {
      this.login = true
    }
    this.cartService.countProd.subscribe((data) => {
      this.countProduct = data
    });
  }

  logOut() {
    this.userService.removeToken();
    this.cartService.clearCart();
    location.reload()

  }
  singIn() {
    this.router.navigate(['/login'])
  }

  getProductByName(newSearch: string) {
    if (newSearch != '') {
      if(!location.pathname.includes(newSearch)){
        this.router.navigate([`/dashboard/products-search/${newSearch}`])
        this.seachEvent.emit(true);
      }
    }
    else{
      this.toastr.error('Debe llenar el cuadro de busqueda');
    }
  }
  
  userPurchases() {
    this.router.navigate([`dashboard/user-purchases/${this.user.id}`])
  }

  userProfileModifier() {
    this.router.navigate([`dashboard/user-profile/${this.user.dni}`])
  }

}