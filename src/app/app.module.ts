import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {ApiService} from './services/api.service';
import { HomeComponent } from './pages/home/home.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { InfoComponent } from './components/info/info.component';
import {ModalModule} from 'ngx-bootstrap/modal';
import { DetailComponent } from './components/detail/detail.component';
import { UsersComponent } from './pages/users/users.component';
import {LoadingBarHttpClientModule} from '@ngx-loading-bar/http-client';
import {HttpClientModule} from '@angular/common/http';
import {UtilsService} from './services/utils.service';
import {AuthGuard} from './auth/guards/auth.guard';
import { LoginComponent } from './auth/pages/login/login.component';
import {AuthmbService} from './auth/authmb.service';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { AwardsComponent } from './pages/awards/awards.component';
import { HeaderComponent } from './components/header/header.component';
import { InfoextraComponent } from './components/infoextra/infoextra.component';
import { CreateproductComponent } from './components/createproduct/createproduct.component';
import { ProcessusersComponent } from './components/processusers/processusers.component';
import { MisteryComponent } from './pages/mistery/mistery.component';
import { StreamComponent } from './pages/stream/stream.component';
import {BsDatepickerModule} from "ngx-bootstrap/datepicker";

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    InfoComponent,
    DetailComponent,
    UsersComponent,
    LoginComponent,
    AwardsComponent,
    HeaderComponent,
    InfoextraComponent,
    CreateproductComponent,
    ProcessusersComponent,
    MisteryComponent,
    StreamComponent
  ],
  imports: [
    LoadingBarHttpClientModule,
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    ModalModule.forRoot(),
    BsDatepickerModule.forRoot(),
  ],
  providers: [
    ApiService,
    UtilsService,
    AuthGuard,
    LoginComponent,
    AuthmbService
  ],
  entryComponents: [InfoComponent, DetailComponent, InfoextraComponent, CreateproductComponent, ProcessusersComponent],
  bootstrap: [AppComponent]
})
export class AppModule { }
