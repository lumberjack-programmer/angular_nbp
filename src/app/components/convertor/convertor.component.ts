import { Component, OnInit } from '@angular/core';
import {FormGroupDirective, NgForm, UntypedFormControl, UntypedFormGroup, Validators} from "@angular/forms";
import {Rate} from "../../models/rate";
import {CurrencyService} from "../../services/currency.service";
import {RangeService} from "../../services/range.service";
import {Range} from "../../models/range";
import {ErrorStateMatcher} from "@angular/material/core";


export class MyErrorStateMatcher implements ErrorStateMatcher {

  isErrorState(control: UntypedFormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

@Component({
  selector: 'app-convertor',
  templateUrl: './convertor.component.html',
  styleUrls: ['./convertor.component.scss']
})
export class ConvertorComponent implements OnInit {
  public iconCircle: String = '../../assets/images/icon-convertor.svg';
  inputLeft: string = "";
  inputRight: string = "";

  changeCount: number = 0;

  // @ts-ignore
  currentInputValueLeft: number;
  // @ts-ignore
  currentInputValueRight: number;

  numberFormControlLeft = new UntypedFormControl('', [Validators.required, Validators.pattern('(?<=^|- )\\d+(\\.\\d+)?(?=$| )')]);
  numberFormControlRight = new UntypedFormControl('', [Validators.required, Validators.pattern('(?<=^|- )\\d+(\\.\\d+)?(?=$| )')]);

  matcherLeft = new MyErrorStateMatcher();
  matcherRight = new MyErrorStateMatcher();

  // @ts-ignore
  currencyRateCodeLeft: Range;

  // @ts-ignore
  currencyRateCodeRight: Range;


  // Dropdown list
  // @ts-ignore
  dropDownCodesLeft: Rate[];
  // @ts-ignore
  dropDownCodesRight: Rate[];
  // @ts-ignore
  choicesLeft: Rate[] = [{value: 'usd', viewValue: 'USD'}];
  // @ts-ignore
  choicesRight: Rate[] = [{value: 'eur', viewValue: 'EUR'}];
  // @ts-ignore
  selectedLeft: string = this.choicesLeft[0].value;
  // @ts-ignore
  selectedRight: string = this.choicesRight[0].value;



  getCurrencyCodesLeft() {
    return this.currencyService.getPriceList().subscribe(
      res => {
        res[0].rates.map((data) => {
          if (data.code != 'USD') {
            this.choicesLeft.push(new Rate(data.code.toLowerCase(), data.code));
          }
        });
      },
    );
  }

  getCurrencyCodesRight() {
    return this.currencyService.getPriceList().subscribe(
      res => {
        res[0].rates.map((data) => {
          if (data.code != 'EUR') {
            this.choicesRight.push(new Rate(data.code.toLowerCase(), data.code));
          }
        });
      },
    );
  }

  constructor(private currencyService: CurrencyService, private rangeService: RangeService) { }

  ngOnInit(): void {
    this.getCurrencyCodesLeft();
    this.getCurrencyCodesRight();
    this.getCurrencyRateDateRangeLeft(`${this.selectedLeft}`);
    this.getCurrencyRateDateRangeRight(`${this.selectedRight}`);
  }

  getLeftValue(event: number) {

    let ratesStr: string = 'rates';

    // @ts-ignore
    this.currentInputValueLeft = event * this.currencyRateCodeLeft[ratesStr][0].bid;

    // @ts-ignore
    let inputRoundRight: number = Math.round(((this.currentInputValueLeft / this.currencyRateCodeRight[ratesStr][0].bid) + Number.EPSILON) * 100) / 100;
    this.inputRight = inputRoundRight.toString();

  }


  getRightValue(event: number) {

    let ratesStr: string = 'rates';

    // @ts-ignore
    this.currentInputValueRight = event * this.currencyRateCodeRight[ratesStr][0].bid;

    // @ts-ignore
     let inputRoundLeft: number = Math.round(((this.currentInputValueRight / this.currencyRateCodeLeft[ratesStr][0].bid) + Number.EPSILON) * 100) / 100;
    this.inputLeft = inputRoundLeft.toString();

  }

  getSelectLeft(event: string) {
    this.selectedLeft = event;
    this.getCurrencyRateDateRangeLeft(`${this.selectedLeft}`);
  }


  getSelectRight(event: string) {
    this.selectedRight = event;
    this.getCurrencyRateDateRangeRight(`${this.selectedRight}`);
  }



  getCurrencyRateDateRangeLeft(theCurrencyCodeLeft: string) {
    return this.rangeService.getCurrencyRateByCode(`${theCurrencyCodeLeft}`).subscribe(
      data => {
        this.currencyRateCodeLeft = data;
          this.updateLeft();
      }
    );
  }

  updateLeft () {
    let ratesStr: string = 'rates';

    // @ts-ignore
    let inputRoundLeft: number = Math.round(((this.currentInputValueRight / this.currencyRateCodeLeft[ratesStr][0].bid) + Number.EPSILON) * 100) / 100;
    this.inputLeft = inputRoundLeft.toString();
  }

  getCurrencyRateDateRangeRight(theCurrencyCodeRight: string) {
    return this.rangeService.getCurrencyRateByCode(`${theCurrencyCodeRight}`).subscribe(
      data => {
        this.currencyRateCodeRight = data;
        if (this.inputRight != '') {
          this.updateRight();
        }
      }
    );
  }


  updateRight() {
    let ratesStr: string = 'rates';
    // @ts-ignore
    let inputRoundRight: number = Math.round(((this.currentInputValueLeft / this.currencyRateCodeRight[ratesStr][0].bid) + Number.EPSILON) * 100) / 100;
    this.inputRight = inputRoundRight.toString();
  }
}
