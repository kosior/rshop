import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {AppComponent} from './app.component';
import {BsNavbarComponent} from './bs-navbar/bs-navbar.component';
import {HomeComponent} from './home/home.component';
import {ProductsComponent} from './products/products.component';
import {ShoppingCartComponent} from './shopping-cart/shopping-cart.component';
import {CheckOutComponent} from './check-out/check-out.component';
import {OrderSuccessComponent} from './order-success/order-success.component';
import {MyOrdersComponent} from './my-orders/my-orders.component';
import {AdminProductsComponent} from './admin/admin-products/admin-products.component';
import {AdminOrdersComponent} from './admin/admin-orders/admin-orders.component';
import {LoginComponent} from './login/login.component';
import {HttpClientModule} from '@angular/common/http';
import {AuthService} from './services/auth/auth.service';
import {FormsModule} from '@angular/forms';
import {JwtModule} from '@auth0/angular-jwt';
import {AuthGuard} from './services/auth-guard/auth-guard.service';
import {JwtService} from './services/jwt/jwt.service';
import {RegisterComponent} from './register/register.component';
import {AdminAuthGuard} from './services/admin-auth-guard/admin-auth-guard.service';
import {ProductFormComponent} from './admin/product-form/product-form.component';
import {CategoryService} from './services/category/category.service';
import {ProductService} from './services/product/product.service';
import {CustomFormsModule} from 'ng2-validation';
import {DataTableModule} from 'angular5-data-table';
import {ProductFilterComponent} from './products/product-filter/product-filter.component';
import {ProductCardComponent} from './product-card/product-card.component';
import {ShoppingCartService} from './services/shopping-cart/shopping-cart.service';
import { ProductQuantityComponent } from './product-quantity/product-quantity.component';
import {OrderService} from './services/order/order.service';
import { ShoppingCartSummaryComponent } from './shopping-cart-summary/shopping-cart-summary.component';


@NgModule({
  declarations: [
    AppComponent,
    BsNavbarComponent,
    HomeComponent,
    ProductsComponent,
    ShoppingCartComponent,
    CheckOutComponent,
    OrderSuccessComponent,
    MyOrdersComponent,
    AdminProductsComponent,
    AdminOrdersComponent,
    LoginComponent,
    RegisterComponent,
    ProductFormComponent,
    ProductFilterComponent,
    ProductCardComponent,
    ProductQuantityComponent,
    ShoppingCartSummaryComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    CustomFormsModule,
    DataTableModule,
    JwtModule.forRoot({
      config: {
        tokenGetter: () => {
          return localStorage.getItem('token');
        },
        whitelistedDomains: ['127.0.0.1:8000'],
        authScheme: 'JWT '

      }
    }),
    NgbModule.forRoot(),
    RouterModule.forRoot([
      { path: '', component: ProductsComponent },
      { path: 'login', component: LoginComponent },
      { path: 'register', component: RegisterComponent },
      { path: 'products', component: ProductsComponent },
      { path: 'shopping-cart', component: ShoppingCartComponent },

      { path: 'check-out', component: CheckOutComponent, canActivate: [AuthGuard] },
      { path: 'order-success/:id', component: OrderSuccessComponent, canActivate: [AuthGuard] },
      { path: 'my/orders', component: MyOrdersComponent, canActivate: [AuthGuard] },

      { path: 'admin/products/new', component: ProductFormComponent, canActivate: [AuthGuard, AdminAuthGuard] },
      { path: 'admin/products/:id', component: ProductFormComponent, canActivate: [AuthGuard, AdminAuthGuard] },
      { path: 'admin/products', component: AdminProductsComponent, canActivate: [AuthGuard, AdminAuthGuard] },
      { path: 'admin/orders', component: AdminOrdersComponent, canActivate: [AuthGuard, AdminAuthGuard] },
    ])
  ],
  providers: [
    AuthService,
    AuthGuard,
    AdminAuthGuard,
    JwtService,
    CategoryService,
    ProductService,
    ShoppingCartService,
    OrderService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
