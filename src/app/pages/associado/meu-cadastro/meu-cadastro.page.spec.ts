import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MeuCadastroPage } from './meu-cadastro.page';

describe('MeuCadastroPage', () => {
  let component: MeuCadastroPage;
  let fixture: ComponentFixture<MeuCadastroPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(MeuCadastroPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
