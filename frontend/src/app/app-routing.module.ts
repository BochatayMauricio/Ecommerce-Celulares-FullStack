import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

//Components
import { LoginComponent } from './components/login/login.component';
import { SignInComponent } from './components/sign-in/sign-in.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { ProductInformationComponent } from './components/product-information/product-information.component';
import { ProductShoppingComponent } from './components/product-shopping/product-shopping.component';

import { UserProfileComponent } from './components/user-profile/user-profile.component';
import { HelpsComponent } from './components/helps/helps.component';

import { PanelAdministradorComponent } from './components/administrador/panel-administrator/panel-administrador.component';
import { ProductosComponent } from './components/administrador/productos/productos.component';
import { AdministratorComponent } from './components/administrador/administrator/administrator.component';
import { VentasComponent } from './components/administrador/ventas/ventas.component';
import { UserPurchasesComponent } from './components/user-purchases/user-purchases.component';
import { CartComponent } from './components/cart/cart.component';
import { PublicationsListComponent } from './components/administrador/publications-list/publications-list.component';
import { AllProductsComponent } from './components/all-products/all-products.component';






const routes: Routes = [
  { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'signin', component: SignInComponent },


  { path: 'admin', component: PanelAdministradorComponent },
  { path: 'admin/products', component: ProductosComponent },
  { path: 'admin/customers', component: AdministratorComponent },
  { path: 'admin/sales', component: VentasComponent },
  { path: 'admin/publications/:id', component: PublicationsListComponent },

  { path: 'dashboard', component: DashboardComponent },
  { path: 'dashboard/all-products', component: AllProductsComponent },
  { path: 'dashboard/helps', component: HelpsComponent },
  { path: 'dashboard/products-search/:name', component: ProductInformationComponent },
  { path: 'dashboard/shopping/:id', component: ProductShoppingComponent },
  { path: 'dashboard/user-purchases/:idUser', component: UserPurchasesComponent },
  { path: 'dashboard/user-profile/:dni', component: UserProfileComponent },
  { path: 'dashboard/cart', component: CartComponent },
  { path: '**', redirectTo: 'dashboard', pathMatch: 'full' }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }



