import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup} from "@angular/forms";
import {RangeService} from "../../services/range.service";
import {Currency} from "../../models/currency";
import {Range} from "../../models/range";
import {MatDatepickerInputEvent} from "@angular/material/datepicker";
import {Rate} from "../../models/rate";
import {CurrencyService} from "../../services/currency.service";
import {map} from "rxjs";


interface DateConfig {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-date-range',
  templateUrl: './date-range.component.html',
  styleUrls: ['./date-range.component.scss']
})

export class DateRangeComponent implements OnInit {
  public iconCircle: String = '../../assets/images/icon-range.svg';

  // @ts-ignore
  currencyRateDateRange: Range;
  defaultPath: string = '/2020-01-01/2020-05-28';
  dateRangeState: string = '/2020-01-01/2020-05-28';

  // Dropdown list
  // @ts-ignore
  dropDownCodes: Rate[];
  // @ts-ignore
  choices:  Rate[] = [{value: 'usd', viewValue: 'USD'}];
  // @ts-ignore
  selected: string = this.choices[0].value;

  constructor(private rangeService: RangeService, private currencyService: CurrencyService) {
  }

  range = new FormGroup({
    start: new FormControl(),
    end: new FormControl(),
  });

  ngOnInit(): void {
    this.getCurrencyCodes();
    this.getCurrencyRateDateRange(this.selected , this.dateRangeState);
  }

  getCurrencyRateDateRange (currency: string ,path: string) {
   return this.rangeService.getCurrencyRateDateRange(`${currency}${path}`).subscribe(
     data => {
       this.currencyRateDateRange = data;
     }
   );
  }

  getCurrencyCodes () {
    return this.currencyService.getPriceList().subscribe(
      res => {
        res[0].rates.map((data) => {
          if (data.code != 'USD') {
            this.choices.push(new Rate(data.code.toLowerCase(), data.code));
          }
        });
      },
    );
  }

  selectRange(event: FormGroup) {
    let value = event.value;
    let start: any = 'start';
    let end: any = 'end';
    let startDate: Date = new Date(value[start]);
    let endDate: Date = new Date(value[end]);

    startDate = new Date (startDate.getTime() - startDate.getTimezoneOffset() * 60000);
    endDate = new Date (endDate.getTime() - endDate.getTimezoneOffset() * 60000);
    this.dateRangeState = `/${startDate.toISOString().substring(0, 10)}/${endDate.toISOString().substring(0, 10)}`;
    this.getCurrencyRateDateRange( `${this.selected}`,`${this.dateRangeState}`);
  }

  getSelect(event: string) {
   this.selected = event;
   this.getCurrencyRateDateRange(`${this.selected}`,`${this.dateRangeState}`);
  }


}


