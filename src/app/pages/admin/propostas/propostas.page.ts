
import { Component, OnInit, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';

import {
  IonContent,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonButtons,
  IonMenuButton,
  IonIcon,
  IonButton,
  IonSpinner,
  ToastController
} from '@ionic/angular';

import { addIcons } from 'ionicons';
import {
  documentTextOutline,
  timeOutline,
  checkmarkCircleOutline,
  closeCircleOutline,
  walletOutline,
  refreshOutline,
  eyeOutline,
  closeOutline
} from 'ionicons/icons';

import {
  AdminPropostasService
} from '../../../services/admin-propostas.service';

import {
  PropostaAdmissao
} from '../../../services/proposta.service';

type FiltroProposta =
  | 'todas'
  | 'pendente'
  | 'aprovada'
  | 'rejeitada';

@Component({
  selector: 'app-propostas',
  standalone: true,
  templateUrl: './propostas.page.html',
  styleUrls: ['./propostas.page.scss'],
  imports: [
    CommonModule,
    IonContent,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonButtons,
    IonMenuButton,
    IonIcon,
    IonButton,
    IonSpinner
  ]
})
export class PropostasPage implements OnInit {


  analisando = signal(false);
  decisaoSelecionada = signal<'aprovada' | 'rejeitada' | null>(null);
  observacaoAnalise = signal('');


  carregando = signal(true);
  erro = signal<string | null>(null);

  propostas = signal<PropostaAdmissao[]>([]);
  filtro = signal<FiltroProposta>('todas');

  propostaSelecionada = signal<PropostaAdmissao | null>(null);

  readonly indicadores = [
    {
      titulo: 'Pendentes de análise',
      icone: 'time-outline'
    },
    {
      titulo: 'Aguardando pagamento',
      icone: 'wallet-outline'
    },
    {
      titulo: 'Aprovadas',
      icone: 'checkmark-circle-outline'
    },
    {
      titulo: 'Rejeitadas',
      icone: 'close-circle-outline'
    }
  ];

  propostasFiltradas = computed(() => {
    const filtroAtual = this.filtro();
    const lista = this.propostas();

    if (filtroAtual === 'todas') {
      return lista;
    }

    return lista.filter(
      proposta => proposta.status === filtroAtual
    );
  });

  totalPendentes = computed(() =>
    this.propostas().filter(p => p.status === 'pendente').length
  );

  totalAprovadas = computed(() =>
    this.propostas().filter(p => p.status === 'aprovada').length
  );

  totalRejeitadas = computed(() =>
    this.propostas().filter(p => p.status === 'rejeitada').length
  );

  constructor(
    private adminPropostasService: AdminPropostasService,
    private toastController: ToastController
  ) {
    addIcons({
      documentTextOutline,
      timeOutline,
      checkmarkCircleOutline,
      closeCircleOutline,
      walletOutline,
      refreshOutline,
      eyeOutline,
      closeOutline
    });
  }

  ngOnInit() {
    void this.carregarPropostas();
  }

  
  iniciarAnalise(decisao: 'aprovada' | 'rejeitada') {
    this.decisaoSelecionada.set(decisao);
    this.observacaoAnalise.set('');
  }

  cancelarAnalise() {
    if (this.analisando()) return;

    this.decisaoSelecionada.set(null);
    this.observacaoAnalise.set('');
  }

  async confirmarAnalise() {
    if (this.analisando()) return;

    const proposta = this.propostaSelecionada();
    const decisao = this.decisaoSelecionada();
    const observacao = this.observacaoAnalise().trim();

    if (!proposta || !decisao) return;

    if (decisao === 'rejeitada' && !observacao) {
      await this.mostrarToast('Informe o motivo da rejeição.');
      return;
    }

    this.analisando.set(true);

    try {
      await this.adminPropostasService.analisarProposta(
        proposta.id,
        decisao,
        observacao || null
      );

      this.decisaoSelecionada.set(null);
      this.propostaSelecionada.set(null);

      await this.carregarPropostas();

      await this.mostrarToast(
        decisao === 'aprovada'
          ? 'Proposta aprovada com sucesso!'
          : 'Proposta rejeitada com sucesso!'
      );

    } catch (error) {
      console.error('Erro ao analisar proposta:', error);

      await this.mostrarToast(
        error instanceof Error
          ? error.message
          : 'Não foi possível analisar a proposta.'
      );

    } finally {
      this.analisando.set(false);
    }
  }

  private async mostrarToast(mensagem: string) {
    const toast = await this.toastController.create({
      message: mensagem,
      duration: 3000,
      position: 'bottom'
    });

    await toast.present();
  }

  async carregarPropostas() {
    this.carregando.set(true);
    this.erro.set(null);

    try {
      const dados =
        await this.adminPropostasService.listarPropostas();

      this.propostas.set(dados);

    } catch (error) {
      console.error('Erro ao carregar propostas:', error);
      this.erro.set('Não foi possível carregar as propostas.');

    } finally {
      this.carregando.set(false);
    }
  }

  alterarFiltro(filtro: FiltroProposta) {
    this.filtro.set(filtro);
  }

  visualizarProposta(proposta: PropostaAdmissao) {
    this.propostaSelecionada.set(proposta);
  }

  fecharDetalhes() {
  if (this.analisando()) return;

  this.propostaSelecionada.set(null);
  this.decisaoSelecionada.set(null);
  this.observacaoAnalise.set('');
}

  obterCampo(
    proposta: PropostaAdmissao,
    campo: string
  ): string {
    const valor = proposta.dados_enviados?.[campo];

    if (valor === null || valor === undefined || valor === '') {
      return 'Não informado';
    }

    return String(valor);
  }
}
