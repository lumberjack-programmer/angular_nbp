import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-gold-page',
  templateUrl: './gold-page.component.html',
  styleUrls: ['./gold-page.component.scss']
})
export class GoldPageComponent implements OnInit {

  public iconCircle: String = '../../assets/images/icon-gold.svg';
  constructor() { }

  ngOnInit(): void {
  }

}
