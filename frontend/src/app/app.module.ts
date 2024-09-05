import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';


//Modulos
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { ToastrModule } from 'ngx-toastr';
import { FilterPipe } from './components/administrator/sales/pipes/filter.pipe';
import { TabsModule } from 'ngx-bootstrap/tabs';
import { AlertModule } from 'ngx-bootstrap/alert';
import { ReactiveFormsModule } from '@angular/forms';
import { MatBadgeModule } from '@angular/material/badge';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatStepperModule } from '@angular/material/stepper';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import {MatButtonModule} from '@angular/material/button';
import {NgxPaginationModule} from 'ngx-pagination';
import {MatSelectModule} from '@angular/material/select';
// Componentes 
import { LoginComponent } from './components/login/login.component';
import { SignInComponent } from './components/sign-in/sign-in.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { SpinnerComponent } from './shared/spinner/spinner.component';
import { AddTokenInterceptor } from './utils/add-token.interceptor';
import { FooterComponent } from './components/footer/footer.component';
import { ContactComponent } from './components/contact/contact.component';
import { HelpsComponent } from './components/helps/helps.component';
import { ProductInformationComponent } from './components/product-information/product-information.component';
import { ProductsCarouselComponent } from './components/products-carousel/products-carousel.component';
import { CarouselModule } from 'ngx-bootstrap/carousel';
import { ModalModule } from 'ngx-bootstrap/modal';
import { ProductShoppingComponent } from './components/product-shopping/product-shopping.component';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { RatingModule } from 'ngx-bootstrap/rating';
import { UserProfileComponent } from './components/user-profile/user-profile.component';
import { AdministratorComponent } from './components/administrator/administrator/administrator.component';


import { PanelAdministradorComponent } from './components/administrator/panel-administrator/panel-administrador.component';
import { ProductsComponent } from './components/administrator/products/products.component';
import { TabsComponent } from './components/administrator/tabs/tabs.component';
import { SalesComponent } from './components/administrator/sales/sales.component';
import { FormularioModificarComponent } from './components/administrator/products/form-modify/formulario-modificar.component';
import { FormularioRegistroComponent } from './components/administrator/products/form-register/formulario-registro.component';
import { ProducListComponent } from './components/administrator/products/produc-list/produc-list.component';
import { AdministratorFormComponent } from './components/administrator/administrator/administrator-form/administrator-form.component';
import { AdministratorsListComponent } from './components/administrator/administrator/administrators-list/administrators-list.component';


import { ModifyFormAdministratorComponent } from './components/administrator/administrator/modify-form-administrator/modify-form-administrator.component';

import { NavBarComponent } from './components/administrator/nav-bar/nav-bar.component';
import { SalesListComponent } from './components/administrator/sales/sales-list/sales-list.component';
import { FooterAdminComponent } from './components/administrator/footerAdmin/footer.component';
import { UserPurchasesComponent } from './components/user-purchases/user-purchases.component';
import { CartComponent } from './components/cart/cart.component';
import { PublicationsListComponent } from './components/administrator/publications-list/publications-list.component';
import { CollapseModule } from 'ngx-bootstrap/collapse';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AccordionModule } from 'ngx-bootstrap/accordion';
import { AllProductsComponent } from './components/all-products/all-products.component';
import { PaymentComponent } from './components/payment/payment.component';
import { PurchaseComponent } from './components/purchase/purchase.component';
import { FormBrandComponent } from './components/administrator/products/form-brand/form-brand.component';
import { HandleErrorInterceptor } from './interceptors/handle-error.interceptor';









@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    SignInComponent,
    DashboardComponent,
    SpinnerComponent,
    FooterComponent,
    ContactComponent,
    HelpsComponent,
    ProductInformationComponent,
    ProductsCarouselComponent,
    ProductShoppingComponent,
    SalesListComponent,
    PanelAdministradorComponent,
    ProductsComponent,
    TabsComponent,
    SalesComponent,
    UserProfileComponent,
    AdministratorComponent,
    FormularioModificarComponent,
    FormularioRegistroComponent,
    ProducListComponent,
    AdministratorFormComponent,
    AdministratorsListComponent,
    ModifyFormAdministratorComponent,
    FooterAdminComponent,
    FooterComponent,
    NavBarComponent,
    FilterPipe,
    NavbarComponent,
    UserPurchasesComponent,
    CartComponent,
    PublicationsListComponent,
    AllProductsComponent,
    PaymentComponent,
    PurchaseComponent,
    FormBrandComponent

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    TabsModule,
    ReactiveFormsModule,
    AlertModule,
    BrowserAnimationsModule, // required animations module
    ModalModule.forRoot(),
    ToastrModule.forRoot({
      timeOut: 3000,
      positionClass: 'toast-bottom-right',
      preventDuplicates: true,
    }),
    CarouselModule.forRoot(),
    ModalModule.forRoot(),
    RatingModule.forRoot(),
    CollapseModule.forRoot(),
    BrowserAnimationsModule,
    BsDropdownModule.forRoot(), // ToastrModule added
    MatBadgeModule,
    MatMenuModule,
    MatIconModule,
    MatDividerModule,
    MatSortModule,
    MatTableModule,
    MatInputModule,
    MatFormFieldModule,
    MatStepperModule,
    MatExpansionModule,
    MatProgressBarModule,
    MatButtonModule,
    NgxPaginationModule,
    BrowserAnimationsModule,
    AccordionModule.forRoot(),
    MatSelectModule

  ],
  providers: [
    {provide: HTTP_INTERCEPTORS, useClass: AddTokenInterceptor, multi: true },
    {provide:HTTP_INTERCEPTORS,useClass: HandleErrorInterceptor,multi:true}
  ],
  bootstrap: [AppComponent]

})
export class AppModule { }
