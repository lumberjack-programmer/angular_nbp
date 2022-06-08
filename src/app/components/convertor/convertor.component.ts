import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup} from "@angular/forms";

interface Food {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-convertor',
  templateUrl: './convertor.component.html',
  styleUrls: ['./convertor.component.scss']
})
export class ConvertorComponent implements OnInit {
  public iconCircle: String = '../../assets/images/icon-convertor.svg';

  foods: Food[] = [
    {value: 'pick-date', viewValue: 'Pick one Date'},
    {value: 'pick-range', viewValue: 'Range'},
  ];

  range = new FormGroup({
    start: new FormControl(),
    end: new FormControl(),
  });

  constructor() { }

  ngOnInit(): void {
  }

}
