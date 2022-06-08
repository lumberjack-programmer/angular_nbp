import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GoldPageComponent } from './gold-page.component';

describe('GoldPageComponent', () => {
  let component: GoldPageComponent;
  let fixture: ComponentFixture<GoldPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GoldPageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GoldPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
