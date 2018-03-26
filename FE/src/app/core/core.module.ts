import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {BsNavbarComponent} from './components/bs-navbar/bs-navbar.component';
import {RegisterComponent} from './components/register/register.component';
import {HomeComponent} from './components/home/home.component';
import {LoginComponent} from './components/login/login.component';
import {RouterModule} from '@angular/router';
import {FormsModule} from '@angular/forms';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    NgbModule.forRoot(),
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
