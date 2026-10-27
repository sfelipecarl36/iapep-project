import { ComponentFixture, TestBed } from '@angular/core/testing';
import { VisaoGeralPage } from './visao-geral.page';

describe('VisaoGeralPage', () => {
  let component: VisaoGeralPage;
  let fixture: ComponentFixture<VisaoGeralPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(VisaoGeralPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
