import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LivrosAutorComponent } from './livros-autor.component';

describe('LivrosAutorComponent', () => {
  let component: LivrosAutorComponent;
  let fixture: ComponentFixture<LivrosAutorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LivrosAutorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LivrosAutorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
