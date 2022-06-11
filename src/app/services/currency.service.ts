import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Currency} from "../models/currency";
import { retry, catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class CurrencyService {

  private currencyUrl = "https://api.nbp.pl/api/exchangerates/tables/c?format=json";

  constructor(private http: HttpClient) { }


  getPriceList(): Observable<Currency[]> {
    return this.http.get<Currency[]>(this.currencyUrl);
  }

  public sortCurrencyByDate (inputUrl : string) : Observable<Currency[]> {
    return this.http.get<Currency[]>(`https://api.nbp.pl/api/exchangerates/tables/c/${inputUrl}/?format=json`).pipe(
      retry(1),

      catchError(this.handleError)
    );

  }

  handleError(error : any) {
      console.log('OK');
      return throwError('dwdw');
  }



  // handleError(error) {
  //
  //   let errorMessage = '';
  //
  //   if (error.error instanceof ErrorEvent) {
  //
  //     // client-side error
  //
  //     errorMessage = Error: ${error.error.message};
  //
  //   } else {
  //
  //     // server-side error
  //
  //     errorMessage = Error Code: ${error.status}\nMessage: ${error.message};
  //
  //   }
  //
  //   window.alert(errorMessage);
  //
  //   return throwError(errorMessage);
  //
  // }




}


