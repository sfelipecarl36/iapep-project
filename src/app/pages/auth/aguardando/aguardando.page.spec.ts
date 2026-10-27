import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AguardandoPage } from './aguardando.page';

describe('AguardandoPage', () => {
  let component: AguardandoPage;
  let fixture: ComponentFixture<AguardandoPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(AguardandoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
