import { Component, OnInit } from '@angular/core';
import {UntypedFormControl, UntypedFormGroup} from "@angular/forms";

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

  range = new UntypedFormGroup({
    start: new UntypedFormControl(),
    end: new UntypedFormControl(),
  });

  constructor() { }

  ngOnInit(): void {
  }

}
