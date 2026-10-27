
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import {
  IonContent,
  IonButton
} from '@ionic/angular';

import { SupabaseService } from '../../../services/supabase.service';

@Component({
  selector: 'app-aguardando',
  standalone: true,
  imports: [IonContent, IonButton],
  template: `
    <ion-content>
      <main class="auth-result">
        <h1>Autenticação concluída</h1>
        <p>
          Sua conta foi autenticada. Estamos preparando
          as permissões e o painel correspondente
          ao seu perfil.
        </p>
        <ion-button (click)="sair()">
          Sair da conta
        </ion-button>
      </main>
    </ion-content>
  `,
  styles: [`
    ion-content {
      --background: #F6F8FC;
    }

    .auth-result {
      min-height: 100%;
      padding: 24px;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      text-align: center;
    }

    h1 {
      color: #010C59;
    }

    p {
      max-width: 440px;
      color: #667085;
      line-height: 1.6;
    }
  `]
})
export class AguardandoPage {
  constructor(
    private supabase: SupabaseService,
    private router: Router
  ) {}

  async sair() {
    const { error } = await this.supabase.signOut();

    if (!error) {
      await this.router.navigateByUrl('/auth/login', {
        replaceUrl: true
      });
    }
  }
}
