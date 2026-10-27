
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import {
  IonContent,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonButtons,
  IonMenuButton,
  IonIcon
} from '@ionic/angular';

import { addIcons } from 'ionicons';
import {
  peopleOutline,
  documentTextOutline,
  businessOutline,
  briefcaseOutline,
  timeOutline,
  arrowForwardOutline,
  shieldCheckmarkOutline
} from 'ionicons/icons';

@Component({
  selector: 'app-visao-geral',
  templateUrl: './visao-geral.page.html',
  styleUrls: ['./visao-geral.page.scss'],
  standalone: true,
  imports: [
    RouterLink,
    IonContent,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonButtons,
    IonMenuButton,
    IonIcon
  ]
})
export class VisaoGeralPage {

  indicadores = [
    {
      titulo: 'Associados ativos',
      icone: 'people-outline',
      valor: null as number | null
    },
    {
      titulo: 'Propostas pendentes',
      icone: 'document-text-outline',
      valor: null as number | null
    },
    {
      titulo: 'Empresas cadastradas',
      icone: 'business-outline',
      valor: null as number | null
    },
    {
      titulo: 'Demandas abertas',
      icone: 'briefcase-outline',
      valor: null as number | null
    }
  ];

  atalhos = [
    {
      titulo: 'Gerenciar associados',
      descricao: 'Cadastros e associações',
      icone: 'people-outline',
      rota: '/admin/associados'
    },
    {
      titulo: 'Gerenciar empresas',
      descricao: 'Empresas cadastradas',
      icone: 'business-outline',
      rota: '/admin/empresas'
    },
    {
      titulo: 'Acompanhar demandas',
      descricao: 'Projetos e perícias',
      icone: 'briefcase-outline',
      rota: '/admin/demandas'
    }
  ];

  constructor() {
    addIcons({
      peopleOutline,
      documentTextOutline,
      businessOutline,
      briefcaseOutline,
      timeOutline,
      arrowForwardOutline,
      shieldCheckmarkOutline
    });
  }
}
