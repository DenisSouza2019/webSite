import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfirmaEnderecoComponent } from './confirma-endereco.component';

describe('ConfirmaEnderecoComponent', () => {
  let component: ConfirmaEnderecoComponent;
  let fixture: ComponentFixture<ConfirmaEnderecoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConfirmaEnderecoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConfirmaEnderecoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
