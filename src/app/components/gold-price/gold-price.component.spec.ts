import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GoldPriceComponent } from './gold-price.component';

describe('GoldPriceComponent', () => {
  let component: GoldPriceComponent;
  let fixture: ComponentFixture<GoldPriceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GoldPriceComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GoldPriceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
