import { AfterViewChecked, Component, OnChanges, OnInit, SimpleChange, SimpleChanges, ViewChild } from '@angular/core';
import { MatMenuTrigger } from '@angular/material/menu';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { timeout } from 'rxjs';
import { product } from 'src/app/interfaces/product';
import { user } from 'src/app/interfaces/user';
import { CartService } from 'src/app/services/cart.service';
import { ProductService } from 'src/app/services/product.service';
import { UserService } from 'src/app/services/user.service';
import { __param } from 'tslib';


@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit /*,AfterViewChecked*/ {
  countProduct = 0;
  pay: boolean = false;
  user!: user;
  login: any;
  isCollapsed = true;
  productList: product[] = [];
  productString: string = '';
  search: any = '';
  showSearchBar: boolean = false;
  constructor(private router: Router, private cartService: CartService, private toastr: ToastrService, private userService: UserService) {
    this.showSearch();
  }

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

  // ngAfterViewChecked(): void {
  //   if(this.user.id == 0){
  //     this.user = this.userService.getThisUserWithSignal();
  //     if (this.user.id > 0) {
  //       this.login = true
  //     }
  //   }
  //   console.log(this.user)
  // }

  logOut() {
    this.userService.removeToken();
    this.cartService.clearCart();
    console.log(location.pathname)
    if (location.pathname == '/dashboard') {
      location.reload();
    } else {
      this.router.navigate(['/dashboard']);
    }

  }
  singIn() {
    this.router.navigate(['/login'])
  }

  getProductByName(newSearch: any) {
    if (newSearch != '') {
      let oldSearch = localStorage.getItem('Search');

      if (location.pathname == `/dashboard/products-search/${oldSearch}`) {
        this.router.navigate([`/dashboard/products-search/${newSearch}`])
        setTimeout(() => {
          location.reload();
        }, 500);

      } else {
        this.router.navigate([`/dashboard/products-search/${newSearch}`])
      }
    } else {
      this.toastr.error('Debe llenar el cuadro de busqueda');
    }
    ;


  }
  userPurchases() {
    this.router.navigate([`dashboard/user-purchases/${this.user.id}`])
  }

  userProfileModifier() {
    this.router.navigate([`dashboard/user-profile/${this.user.dni}`])
  }

  showSearch() {
    let search = localStorage.getItem('Search');
    if (location.pathname == '/dashboard/all-products' || location.pathname == `/dashboard/products-search/${search}`) {
      this.showSearchBar = true;
    }
  }
}
