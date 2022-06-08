import { Component, OnInit } from '@angular/core';
import {Price} from "../../models/price";
import {PriceService} from "../../services/price.service";

@Component({
  selector: 'app-body',
  templateUrl: './body.component.html',
  styleUrls: ['./body.component.scss']
})
export class BodyComponent implements OnInit {
  public iconCircle: String = '../../assets/images/icon-exchange-rates.svg';

  ngOnInit(): void {
  }


}
