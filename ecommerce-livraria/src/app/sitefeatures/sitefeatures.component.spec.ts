import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SitefeaturesComponent } from './sitefeatures.component';

describe('SitefeaturesComponent', () => {
  let component: SitefeaturesComponent;
  let fixture: ComponentFixture<SitefeaturesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SitefeaturesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SitefeaturesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
