import { Component, OnInit } from '@angular/core';
import { HeaderComponent } from '../header/header.component';

@Component({
  selector: 'app-left-side-menu',
  templateUrl: './left-side.component.html',
  styleUrls: ['./left-side.component.scss']
})
export class LeftSideComponent implements OnInit {

  public imgHome: String = '../../assets/images/icon-home.svg';
  public imgExchangeRates: String = '../../assets/images/icon-exchange-rates.svg';

  constructor() { }

  ngOnInit(): void {
  }

}
