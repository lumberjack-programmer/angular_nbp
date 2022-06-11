import {AfterViewInit, Component, ElementRef, OnInit, VERSION, ViewChild} from '@angular/core';
import {UntypedFormControl, UntypedFormGroup} from "@angular/forms";
import {RangeService} from "../../services/range.service";
import {Range} from "../../models/range";
import {Rate} from "../../models/rate";
import {CurrencyService} from "../../services/currency.service";
// import {Chart} from "chart.js";

import {Chart, LineController, LineElement, PointElement, LinearScale, Title, CategoryScale} from 'chart.js';

Chart.register(LineController, LineElement, PointElement, LinearScale, Title, CategoryScale);

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

  @ViewChild('canvas') private canvas: any;


  // @ts-ignore
  chart: Chart<string, DefaultDataPoint<string>, unknown>;

  // @ts-ignore
  currencyRateDateRange: Range;
  defaultPath: string = '/2020-01-01/2020-05-28';
  dateRangeState: string = '/2020-01-01/2020-05-28';

  // Dropdown list
  // @ts-ignore
  dropDownCodes: Rate[];
  // @ts-ignore
  choices: Rate[] = [{value: 'usd', viewValue: 'USD'}];
  // @ts-ignore
  selected: string = this.choices[0].value;

  constructor(private rangeService: RangeService, private currencyService: CurrencyService) {
  }

  range = new UntypedFormGroup({
    start: new UntypedFormControl(),
    end: new UntypedFormControl(),
  });

  ngOnInit(): void {
    this.getCurrencyCodes();
    this.getCurrencyRateDateRange(this.selected, this.dateRangeState);
    this.getChart(this.selected, this.dateRangeState);
  }

  getCurrencyRateDateRange(currency: string, path: string) {
    return this.rangeService.getCurrencyRateDateRange(`${currency}${path}`).subscribe(
      data => {
        this.currencyRateDateRange = data;
      }
    );
  }

  getCurrencyCodes() {
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

  selectRange(event: UntypedFormGroup) {
    let value = event.value;
    let start: any = 'start';
    let end: any = 'end';
    let startDate: Date = new Date(value[start]);
    let endDate: Date = new Date(value[end]);

    startDate = new Date(startDate.getTime() - startDate.getTimezoneOffset() * 60000);
    endDate = new Date(endDate.getTime() - endDate.getTimezoneOffset() * 60000);
    this.dateRangeState = `/${startDate.toISOString().substring(0, 10)}/${endDate.toISOString().substring(0, 10)}`;
    this.getCurrencyRateDateRange(`${this.selected}`, `${this.dateRangeState}`);
    this.chart.destroy();
    this.getChart(`${this.selected}`, `${this.dateRangeState}`);
  }

  getSelect(event: string) {
    this.selected = event;
    this.getCurrencyRateDateRange(`${this.selected}`, `${this.dateRangeState}`);
    this.chart.destroy();
    this.getChart(`${this.selected}`, `${this.dateRangeState}`);
  }


  getChart(currency: string, path: string) {

    this.rangeService.getCurrencyRateDateRange(`${currency}${path}`)
      .subscribe(res => {
        let ratesString: string = 'rates';
        // @ts-ignore
        let effectiveDate = res[ratesString].map(res => {
          let effectiveDateString = 'effectiveDate';
          return res[effectiveDateString];
        });


        let dT: string[] = [];

        // @ts-ignore
        effectiveDate.forEach((res) => {
          let newDate = new Date(Date.parse(res));
          console.log(newDate.toLocaleTimeString('en', {year: 'numeric', month: 'short', day: 'numeric'}));
          dT.push(newDate.toDateString());
        });


        // console.log(dT.toLocaleTimeString('en', {year: 'numeric', month: 'short', day: 'numeric'}));
        // @ts-ignore
        let ask = res[ratesString].map(res => {
          let askString = 'ask';
          return res[askString];
        });
        console.log(ask);
        // @ts-ignore
        let bid = res[ratesString].map(res => {
          let bidString = 'bid';
          return res[bidString];
        });
        console.log(bid);

        let ctx2 = document.getElementById('canvas');
        // @ts-ignore
        const up = (ctx, value) => ctx.p0.parsed.y < ctx.p1.parsed.y ? value : undefined;
        // @ts-ignore
        const down = (ctx, value) => ctx.p0.parsed.y > ctx.p1.parsed.y ? value : undefined;

        // @ts-ignore
        this.chart = new Chart(ctx2, {
          type: 'line',
          data: {
            labels: dT,
            datasets: [
              {
                data: ask,
                // borderColor: [
                //   'rgb(248,54,89)',
                //   'rgba(54, 162, 235, 1)',
                // ],
                backgroundColor: [
                    'rgba(0, 0, 0, 0.1)',

                ],
                borderWidth: 2,
                segment: {
                  borderColor: ctx => up(ctx, 'rgb(248,54,89)') || down(ctx, 'rgba(54, 162, 235, 1)'),
                  borderDash: ctx => down(ctx, [6, 6]),
                }
              }
              // {
              //   data: bid,
              //   // borderColor: [
              //   //   'rgb(248,54,89)',
              //   //   'rgba(54, 162, 235, 1)',
              //   // ],
              //   backgroundColor: [
              //     'rgba(0, 0, 0, 0.1)',
              //
              //   ],
              //   borderWidth: 2,
              //   segment: {
              //     borderColor: ctx => up(ctx, 'rgb(248,54,89)') || down(ctx, 'rgba(54, 162, 235, 1)'),
              //     borderDash: ctx => down(ctx, [6, 6]),
              //   }
              // }
            ]
          },
          options: {
            scales: {
              y: {
                grid: {
                  color: '#262626'
                }
              },
              x: {
                grid: {
                  color: '#262626'
                }
              }
            }
          }
        })

      })
  }


}


