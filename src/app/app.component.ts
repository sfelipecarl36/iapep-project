
import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import {
  IonApp, IonSplitPane, IonMenu, IonContent,
  IonList, IonMenuToggle, IonItem, IonIcon,
  IonLabel, IonRouterOutlet
} from '@ionic/angular';
import { addIcons } from 'ionicons';
import {
  gridOutline, peopleOutline, businessOutline,
  briefcaseOutline, barChartOutline, settingsOutline,
  personCircleOutline
} from 'ionicons/icons';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
  imports: [
    RouterLink, RouterLinkActive, IonApp, IonSplitPane,
    IonMenu, IonContent, IonList, IonMenuToggle,
    IonItem, IonIcon, IonLabel, IonRouterOutlet
  ],
})
export class AppComponent {
  protected readonly appPages = [
    { title: 'Visão geral', url: '/admin/visao-geral', icon: 'grid-outline' },
    { title: 'Associados', url: '/admin/associados', icon: 'people-outline' },
    { title: 'Empresas', url: '/admin/empresas', icon: 'business-outline' },
    { title: 'Demandas', url: '/admin/demandas', icon: 'briefcase-outline' },
    { title: 'Relatórios', url: '/admin/relatorios', icon: 'bar-chart-outline' },
    { title: 'Configurações', url: '/admin/configuracoes', icon: 'settings-outline' },
  ];

  constructor() {
    addIcons({
      gridOutline, peopleOutline, businessOutline,
      briefcaseOutline, barChartOutline,
      settingsOutline, personCircleOutline
    });
  }
}
