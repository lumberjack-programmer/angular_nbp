import { Component, OnInit } from '@angular/core';
import {Currency} from "../../models/currency";
import {CurrencyService} from "../../services/currency.service";
import {MatDatepickerInputEvent} from "@angular/material/datepicker";
import {DatePipe} from "@angular/common";
import {UntypedFormControl, FormGroupDirective, NgForm, Validators} from "@angular/forms";
import {ErrorStateMatcher} from "@angular/material/core";


interface DateConfig {
  value: string;
  viewValue: string;
}
export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: UntypedFormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

class NumberFormControl {

}

@Component({
  selector: 'app-exchange-rates',
  templateUrl: './exchange-rates.component.html',
  styleUrls: ['./exchange-rates.component.scss']
})
export class ExchangeRatesComponent implements OnInit {
  public iconCircle: String = '../../assets/images/icon-exchange-rates.svg';

  username: string = "";
  title: string = "";
  changeCount: number = 0;


  numberFormControl = new UntypedFormControl('', [Validators.required, Validators.pattern('(?<=^|- )\\d+(\\.\\d+)?(?=$| )')]);

  matcher = new MyErrorStateMatcher();



  isAllRates : boolean = false;
  isSpecificRate : boolean = true;

  // Dropdown list
  choices: DateConfig[] = [
    {value: 'all-rates', viewValue: 'Pick a date'},
    {value: 'specific-rate', viewValue: 'Calculate for Polish zloty'},
  ];

  // Datepicker selected value
  date = new UntypedFormControl(new Date());
  serializedDate = new UntypedFormControl(new Date().toISOString());

  selected = this.choices[0].value;

  // @ts-ignore
  currencies : Currency[];
  //Date to be picked
  events: string[] = [];

  log : number = -1;

  constructor(private currencyService: CurrencyService, private datepipe : DatePipe, ) {
  }

  ngOnInit(): void {
    this.getCurrencies();
  }

  getCurrencies() {
    return this.currencyService.getPriceList().subscribe(
      data => {
        this.currencies = data;
      }
    );
  }

  getCurrenciesByDate(datePicked : string) {
    return this.currencyService.sortCurrencyByDate(datePicked).subscribe(
      data => {
        this.currencies = data;
      }
    );
  }

  addEvent(event: MatDatepickerInputEvent<Date>) {
    // @ts-ignore
    let latest_date =this.datepipe.transform(event.value, 'yyyy-MM-dd');
    this.events.push(`${latest_date}`);
    this.getCurrenciesByDate(`${latest_date}`);

  }


  getSelect(event: string) {
    if (event === 'specific-rate') {
      this.isAllRates = !this.isAllRates;
      this.isSpecificRate = !this.isSpecificRate;
    }
    if (event === 'all-rates') {
      this.isAllRates = !this.isAllRates;
      this.isSpecificRate = !this.isSpecificRate;
    }
  }


  // isShowRange() {
  //   this.showRange = !this.showRange;
  // }
  //
  // isOneDate() {
  //   this.showOneDate = !this.showOneDate;
  // }


}




// 20220531200836
// https://api.nbp.pl/api/exchangerates/tables/C?format=json

// [
//   {
//     "table": "C",
//     "no": "104/C/NBP/2022",
//     "tradingDate": "2022-05-30",
//     "effectiveDate": "2022-05-31",
//     "rates": [
//       {
//         "currency": "dolar amerykański",
//         "code": "USD",
//         "bid": 4.2094,
//         "ask": 4.2944
//       },
