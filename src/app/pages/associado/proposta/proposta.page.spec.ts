import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PropostaPage } from './proposta.page';

describe('PropostaPage', () => {
  let component: PropostaPage;
  let fixture: ComponentFixture<PropostaPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(PropostaPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
