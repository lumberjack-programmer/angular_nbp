import { Component, OnInit } from '@angular/core';
import {Price} from "../../models/price";
import {PriceService} from "../../services/price.service";

@Component({
  selector: 'app-gold-price',
  templateUrl: './gold-price.component.html',
  styleUrls: ['./gold-price.component.scss']
})
export class GoldPriceComponent implements OnInit {

  // @ts-ignore
  prices: Price[];

  constructor(private priceService: PriceService) { }

  ngOnInit(): void {
    this.listPrices();
  }


  listPrices() {
    this.priceService.getPriceList().subscribe(
      data => {
        this.prices = data;
        this.prices[0].cena = this.changed(data[0].cena);
      }
    )
  }

  changed (price : number) {
    return price;
  }

}
