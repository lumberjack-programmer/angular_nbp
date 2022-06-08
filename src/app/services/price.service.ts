import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {map, Observable, throwError} from "rxjs";
import {Price} from "../models/price";

@Injectable({
  providedIn: 'root'
})
export class PriceService {

  private goldPriceUrl = "http://api.nbp.pl/api/cenyzlota?format=json";

  constructor(private http: HttpClient) { }

  getPriceList(): Observable<Price[]> {
    return this.http.get<Price[]>(this.goldPriceUrl);
      // .pipe(
      //   map(response => response._embedded.prices)
      // );
  }
}

export interface GetResponse {
  _embedded: {
    prices: Price[];
  }
}
