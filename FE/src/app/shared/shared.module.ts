import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ProductCardComponent} from 'shared/components/product-card/product-card.component';
import {ProductQuantityComponent} from 'shared/components/product-quantity/product-quantity.component';
import {AuthService} from 'shared/services/auth/auth.service';
import {AuthGuard} from 'shared/services/auth-guard/auth-guard.service';
import {OrderService} from 'shared/services/order/order.service';
import {CategoryService} from 'shared/services/category/category.service';
import {ShoppingCartService} from 'shared/services/shopping-cart/shopping-cart.service';
import {ProductService} from 'shared/services/product/product.service';
import {JwtService} from 'shared/services/jwt/jwt.service';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    ProductCardComponent,
    ProductQuantityComponent
  ],
  exports: [
    ProductCardComponent,
    ProductQuantityComponent
  ],
  providers: [
    AuthService,
    AuthGuard,
    JwtService,
    CategoryService,
    ProductService,
    ShoppingCartService,
    OrderService
  ],
})
export class SharedModule { }
