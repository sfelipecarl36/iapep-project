
import { Component } from '@angular/core';
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
  documentTextOutline,
  timeOutline,
  checkmarkCircleOutline,
  closeCircleOutline,
  walletOutline
} from 'ionicons/icons';

@Component({
  selector: 'app-propostas',
  standalone: true,
  templateUrl: './propostas.page.html',
  styleUrls: ['./propostas.page.scss'],
  imports: [
    IonContent,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonButtons,
    IonMenuButton,
    IonIcon
  ]
})
export class PropostasPage {
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

  constructor() {
    addIcons({
      documentTextOutline,
      timeOutline,
      checkmarkCircleOutline,
      closeCircleOutline,
      walletOutline
    });
  }
}
