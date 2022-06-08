import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Range} from "../models/range";

@Injectable({
  providedIn: 'root'
})
export class RangeService {
//https://api.nbp.pl/api/exchangerates/rates/a/usd/2020-01-01/2020-05-28/?format=json

  private baseUrl = 'https://api.nbp.pl/api/exchangerates/rates/c/';

  constructor(private httpClient: HttpClient) { }

  getCurrencyRateDateRange (theRange: string) {
    const fullUrl = `${this.baseUrl}${theRange}/?format=json`;
    console.log(fullUrl);
    return this.httpClient.get<Range>(fullUrl);
  }
}
