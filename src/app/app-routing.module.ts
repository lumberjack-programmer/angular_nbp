import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {ExchangeRatesComponent} from "./components/exchange-rates/exchange-rates.component";
import {HomeComponent} from "./components/home/home.component";
import {GoldPageComponent} from "./components/gold-page/gold-page.component";
import {ConvertorComponent} from "./components/convertor/convertor.component";
import {LoginComponent} from "./components/login/login.component";
import {RegistrationComponent} from "./components/registration/registration.component";
import {DateRangeComponent} from "./components/date-range/date-range.component";

const routes: Routes = [
  // {path: '', component: HomeComponent},
  {path: 'exchange-rates', component: ExchangeRatesComponent},
  {path: 'currency-convertor', component: ConvertorComponent},
  {path: 'data-range', component: DateRangeComponent},
  {path: 'gold', component: GoldPageComponent},
  {path: 'login', component: LoginComponent},
  {path: 'registration', component: RegistrationComponent},
  {path: '**', redirectTo: '', component: ExchangeRatesComponent},];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
