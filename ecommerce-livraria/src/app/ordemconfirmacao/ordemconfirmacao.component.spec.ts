import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OrdemconfirmacaoComponent } from './ordemconfirmacao.component';

describe('OrdemconfirmacaoComponent', () => {
  let component: OrdemconfirmacaoComponent;
  let fixture: ComponentFixture<OrdemconfirmacaoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OrdemconfirmacaoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OrdemconfirmacaoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
