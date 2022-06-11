import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { HttpClientModule } from '@angular/common/http';
import { LeftSideComponent } from './components/left-side-menu/left-side-menu.component';
import { HeaderComponent } from './components/header/header.component';
import { RightSideComponentComponent } from './components/right-side-component/right-side-component.component';
import { BodyComponent } from './components/body/body.component';
import {PriceService} from "./services/price.service";
import { GoldPriceComponent } from './components/gold-price/gold-price.component';
import { ExchangeRatesComponent } from './components/exchange-rates/exchange-rates.component';
import { GoldPageComponent } from './components/gold-page/gold-page.component';
import { HomeComponent } from './components/home/home.component';
import { ConvertorComponent } from './components/convertor/convertor.component';
import {MatInputModule} from "@angular/material/input";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatSelectModule} from "@angular/material/select";
import {MatNativeDateModule} from '@angular/material/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {CurrencyService} from "./services/currency.service";
import {MatDatepickerModule} from "@angular/material/datepicker";
import { DatePipe } from '@angular/common';
import { LoginComponent } from './components/login/login.component';
import { RegistrationComponent } from './components/registration/registration.component';
import { RateComponent } from './services/rate/rate.component';
import { DateRangeComponent } from './components/date-range/date-range.component';


@NgModule({
  declarations: [
    AppComponent,
    LeftSideComponent,
    HeaderComponent,
    RightSideComponentComponent,
    BodyComponent,
    GoldPriceComponent,
    ExchangeRatesComponent,
    GoldPageComponent,
    HomeComponent,
    ConvertorComponent,
    LoginComponent,
    RegistrationComponent,
    RateComponent,
    DateRangeComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    MatInputModule,
    MatFormFieldModule,
    MatSelectModule,
    MatNativeDateModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MatDatepickerModule
  ],
  providers: [PriceService, CurrencyService, DatePipe],
  bootstrap: [AppComponent]
})
export class AppModule { }
