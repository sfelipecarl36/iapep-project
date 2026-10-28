
import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

import {
  IonContent,
  IonButton,
  IonSpinner,
  ToastController
} from '@ionic/angular';

import {
  PropostaService,
  PropostaAdmissao
} from '../../../services/proposta.service';

import {
  PerfilService,
  PerfilUsuario
} from '../../../services/perfil.service';

@Component({
  selector: 'app-proposta',
  standalone: true,
  templateUrl: './proposta.page.html',
  styleUrls: ['./proposta.page.scss'],
  imports: [
    CommonModule,
    RouterLink,
    IonContent,
    IonButton,
    IonSpinner
  ]
})
export class PropostaPage implements OnInit {

  carregando = signal(true);
  enviando = signal(false);

  proposta = signal<PropostaAdmissao | null>(null);
  perfil = signal<PerfilUsuario | null>(null);

  erro = signal<string | null>(null);

  constructor(
    private propostaService: PropostaService,
    private perfilService: PerfilService,
    private toastController: ToastController
  ) {}

  ngOnInit() {
    void this.carregarDados();
  }

  async carregarDados() {
    this.carregando.set(true);
    this.erro.set(null);

    try {
      const [proposta, perfil] = await Promise.all([
        this.propostaService.buscarProposta(),
        this.perfilService.buscarPerfil()
      ]);

      this.proposta.set(proposta);
      this.perfil.set(perfil);

    } catch (error) {
      console.error('Erro ao carregar proposta:', error);

      this.erro.set(
        'Não foi possível carregar as informações.'
      );

    } finally {
      this.carregando.set(false);
    }
  }

  get cadastroCompleto(): boolean {
    const dados = this.perfil();

    return !!(
      dados?.nome_completo?.trim() &&
      dados?.cpf?.trim() &&
      dados?.crea_numero?.trim() &&
      dados?.crea_uf
    );
  }

  async enviarProposta() {
    if (this.enviando() || this.carregando()) {
      return;
    }

    if (this.proposta()?.status === 'pendente') {
      return;
    }

    if (this.proposta()?.status === 'aprovada') {
      return;
    }

    if (!this.cadastroCompleto) {
      await this.mostrarMensagem(
        'Complete seus dados pessoais e profissionais.'
      );
      return;
    }

    this.enviando.set(true);

    try {
      await this.propostaService.enviarProposta();

      await this.carregarDados();

      await this.mostrarMensagem(
        'Proposta enviada com sucesso!'
      );

    } catch (error) {
      console.error('Erro ao enviar proposta:', error);

      const mensagem =
        error instanceof Error
          ? error.message
          : 'Não foi possível enviar sua proposta.';

      await this.mostrarMensagem(mensagem);

    } finally {
      this.enviando.set(false);
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
