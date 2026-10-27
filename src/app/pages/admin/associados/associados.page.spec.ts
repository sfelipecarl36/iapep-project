import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AssociadosPage } from './associados.page';

describe('AssociadosPage', () => {
  let component: AssociadosPage;
  let fixture: ComponentFixture<AssociadosPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(AssociadosPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
