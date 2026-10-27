
import { Component } from '@angular/core';
import {
  IonContent,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonButtons,
  IonMenuButton,
  IonIcon,
  IonSearchbar,
  IonSelect,
  IonSelectOption
} from '@ionic/angular';

import { FormsModule } from '@angular/forms';
import { addIcons } from 'ionicons';
import {
  peopleOutline,
  checkmarkCircleOutline,
  timeOutline,
  calendarOutline,
  searchOutline
} from 'ionicons/icons';

@Component({
  selector: 'app-associados',
  templateUrl: './associados.page.html',
  styleUrls: ['./associados.page.scss'],
  standalone: true,
  imports: [
    FormsModule,
    IonContent,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonButtons,
    IonMenuButton,
    IonIcon,
    IonSearchbar,
    IonSelect,
    IonSelectOption
  ]
})
export class AssociadosPage {
  pesquisa = '';
  filtroStatus = 'todos';

  indicadores = [
    {
      titulo: 'Associados ativos',
      icone: 'checkmark-circle-outline'
    },
    {
      titulo: 'Propostas pendentes',
      icone: 'time-outline'
    },
    {
      titulo: 'Associações vencidas',
      icone: 'calendar-outline'
    },
    {
      titulo: 'Total de cadastros',
      icone: 'people-outline'
    }
  ];

  constructor() {
    addIcons({
      peopleOutline,
      checkmarkCircleOutline,
      timeOutline,
      calendarOutline,
      searchOutline
    });
  }
}
