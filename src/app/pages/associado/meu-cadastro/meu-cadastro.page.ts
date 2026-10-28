
import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';


import {
  IonContent,
  IonInput,
  IonButton,
  IonSpinner,
  IonSelect,
  IonSelectOption,
  ToastController
} from '@ionic/angular';

import {
  PerfilService,
  DadosPerfil
} from '../../../services/perfil.service';

@Component({
  selector: 'app-meu-cadastro',
  standalone: true,
  templateUrl: './meu-cadastro.page.html',
  styleUrls: ['./meu-cadastro.page.scss'],
  imports: [
    CommonModule,
    FormsModule,
    IonContent,
    IonInput,
    IonButton,
    IonSpinner,
    IonSelect,
    IonSelectOption
  ]
})
export class MeuCadastroPage implements OnInit {

  carregando = signal(true);
  salvando = signal(false);

  dados: DadosPerfil = this.criarFormularioVazio();

  estados = [
    'AC', 'AL', 'AP', 'AM', 'BA', 'CE', 'DF',
    'ES', 'GO', 'MA', 'MT', 'MS', 'MG', 'PA',
    'PB', 'PR', 'PE', 'PI', 'RJ', 'RN', 'RS',
    'RO', 'RR', 'SC', 'SP', 'SE', 'TO'
  ];

  constructor(
    private perfilService: PerfilService,
    private toastController: ToastController
  ) {}

  ngOnInit() {
    void this.carregarCadastro();
  }

  private criarFormularioVazio(): DadosPerfil {
    return {
      nome_completo: '',
      email: '',
      telefone: '',
      cpf: '',
      rg: '',
      data_nascimento: null,
      naturalidade: '',
      nacionalidade: 'Brasileira',
      filiacao: '',
      crea_numero: '',
      crea_uf: null,
      titulo_profissional: '',
      foto_url: null
    };
  }

  
async carregarCadastro() {

    this.carregando.set(true);

    try {

      const perfil = await this.perfilService.buscarPerfil();

      if (perfil) {
        const { id, ...dados } = perfil;

        this.dados = {
          ...this.criarFormularioVazio(),
          ...dados
        };
      }

    } catch (error) {
      console.error('[CADASTRO] Erro:', error);

      await this.mostrarMensagem(
        'Não foi possível carregar seu cadastro.'
      );

    } finally {
      this.carregando.set(false);
    }
  }


  

async salvarCadastro() {
  if (this.salvando() || this.carregando()) {
    return;
  }

  const nome = this.dados.nome_completo?.trim() || '';
  const email = this.dados.email?.trim() || '';
  const cpf = this.dados.cpf?.trim() || '';

  if (!nome || !email) {
    const toast = await this.toastController.create({
      message: 'Preencha nome completo e e-mail.',
      duration: 3000,
      position: 'bottom'
    });

    await toast.present();
    return;
  }

  if (cpf && !this.validarCPF(cpf)) {
    const toast = await this.toastController.create({
      message: 'O CPF informado é inválido.',
      duration: 3000,
      position: 'bottom'
    });

    await toast.present();
    return;
  }

  this.salvando.set(true);

  try {
    await this.perfilService.salvarPerfil({
      ...this.dados,
      nome_completo: nome,
      email: email.toLowerCase(),
      cpf: cpf ? cpf.replace(/\D/g, '') : null,
      crea_numero: this.dados.crea_numero?.trim() || null,
      crea_uf: this.dados.crea_uf?.toUpperCase() || null
    });

    const toast = await this.toastController.create({
      message: 'Cadastro salvo com sucesso!',
      duration: 2500,
      position: 'bottom'
    });

    await toast.present();

  } catch (error) {
    console.error('Erro ao salvar cadastro:', error);

    const toast = await this.toastController.create({
      message: this.mensagemErroCadastro(error),
      duration: 3500,
      position: 'bottom'
    });

    await toast.present();

  } finally {
    this.salvando.set(false);
  }
}



private mensagemErroCadastro(error: unknown): string {
  const erro = error as {
    code?: string;
    message?: string;
  };

  if (erro?.code === '23505') {
    const mensagem = erro.message || '';

    if (mensagem.includes('perfis_cpf_unico')) {
      return 'Este CPF já está cadastrado em outra conta.';
    }

    if (mensagem.includes('perfis_email_unico')) {
      return 'Este e-mail já está cadastrado em outra conta.';
    }

    if (mensagem.includes('perfis_crea_unico')) {
      return 'Este registro CREA já está cadastrado em outra conta.';
    }

    return 'Um dos dados informados já está cadastrado.';
  }

  return 'Não foi possível salvar o cadastro. Tente novamente.';
}



private validarCPF(cpf: string): boolean {
  const numeros = cpf.replace(/\D/g, '');

  if (numeros.length !== 11) {
    return false;
  }

  if (/^(\d)\1{10}$/.test(numeros)) {
    return false;
  }

  const calcularDigito = (quantidade: number): number => {
    let soma = 0;

    for (let i = 0; i < quantidade; i++) {
      soma += Number(numeros[i]) * (quantidade + 1 - i);
    }

    const resto = (soma * 10) % 11;

    return resto === 10 ? 0 : resto;
  };

  return (
    calcularDigito(9) === Number(numeros[9]) &&
    calcularDigito(10) === Number(numeros[10])
  );
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
