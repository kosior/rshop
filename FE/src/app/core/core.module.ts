import {NgModule} from '@angular/core';
import {BsNavbarComponent} from './components/bs-navbar/bs-navbar.component';
import {RegisterComponent} from './components/register/register.component';
import {HomeComponent} from './components/home/home.component';
import {LoginComponent} from './components/login/login.component';
import {RouterModule} from '@angular/router';
import {SharedModule} from 'shared/shared.module';

@NgModule({
  imports: [
    SharedModule,
    RouterModule.forChild([])
  ],
  declarations: [
    BsNavbarComponent,
    HomeComponent,
    LoginComponent,
    RegisterComponent
  ],
  exports: [
    BsNavbarComponent
  ]
})
export class CoreModule { }
