import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MeuPainelPage } from './meu-painel.page';

describe('MeuPainelPage', () => {
  let component: MeuPainelPage;
  let fixture: ComponentFixture<MeuPainelPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(MeuPainelPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
