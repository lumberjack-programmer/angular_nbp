import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-rate',
  templateUrl: './rate.component.html',
  styleUrls: ['./rate.component.scss']
})
export class RateComponent implements OnInit {

  rateUrl = "https://api.nbp.pl/api/exchangerates/rates/c/usd/2012-01-01/2012-01-31/?format=json";

  constructor() { }

  ngOnInit(): void {
  }

}
