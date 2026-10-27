
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../../services/auth.service';


import {
  IonContent,
  IonIcon,
  IonInput,
  IonButton,
  IonSpinner,
  ToastController
} from '@ionic/angular';

import { addIcons } from 'ionicons';
import {
  lockClosedOutline,
  mailOutline,
  logInOutline
} from 'ionicons/icons';

import { SupabaseService } from '../../../services/supabase.service';

@Component({
  selector: 'app-login',
  standalone: true,
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  imports: [
    FormsModule,
    IonContent,
    IonIcon,
    IonInput,
    IonButton,
    IonSpinner
  ]
})
export class LoginPage {
  email = '';
  senha = '';
  carregando = false;

  constructor(
    private supabase: SupabaseService,
    private router: Router,
    private toastController: ToastController,
    private auth: AuthService
  ) {
    addIcons({
      lockClosedOutline,
      mailOutline,
      logInOutline
    });
  }

  async entrar() {
    if (this.carregando) return;

    const email = this.email.trim();

    if (!email || !this.senha) {
      await this.mostrarMensagem(
        'Informe seu e-mail e sua senha.'
      );
      return;
    }

    this.carregando = true;

    try {
      const { data, error } =
        await this.supabase.client.auth.signInWithPassword({
          email,
          password: this.senha
        });

      if (error || !data.user) {
        await this.mostrarMensagem(
          'Não foi possível entrar. Verifique suas credenciais.'
        );
        return;
      }

      this.senha = '';

      const destino = await this.auth.getDestination();

      await this.router.navigateByUrl(destino, {
        replaceUrl: true
      });

    } catch {
      await this.mostrarMensagem(
        'Não foi possível conectar ao serviço de autenticação.'
      );
    } finally {
      this.carregando = false;
    }
  }

  private async mostrarMensagem(mensagem: string) {
    const toast = await this.toastController.create({
      message: mensagem,
      duration: 3000,
      position: 'bottom'
    });

    await toast.present();
  }
}
