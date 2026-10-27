
import { Component, OnInit, OnDestroy, NgZone, signal } from '@angular/core';
import {
  Router,
  NavigationEnd,
  RouterLink,
  RouterLinkActive
} from '@angular/router';

import { Subscription, filter } from 'rxjs';

import {
  IonApp,
  IonSplitPane,
  IonMenu,
  IonContent,
  IonList,
  IonMenuToggle,
  IonItem,
  IonIcon,
  IonLabel,
  IonRouterOutlet
} from '@ionic/angular';

import { addIcons } from 'ionicons';
import {
  gridOutline,
  peopleOutline,
  businessOutline,
  briefcaseOutline,
  barChartOutline,
  settingsOutline,
  personCircleOutline,
  documentTextOutline,
  homeOutline,
  personOutline,
  cardOutline,
  walletOutline,
  addCircleOutline
} from 'ionicons/icons';

import {
  AuthService,
  UserRole
} from './services/auth.service';

import { SupabaseService } from './services/supabase.service';

import {
  MenuItem,
  MENU_ADMIN,
  MENU_ASSOCIADO,
  MENU_EMPRESA
} from './models/menu.model';

@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
  imports: [
    RouterLink,
    RouterLinkActive,
    IonApp,
    IonSplitPane,
    IonMenu,
    IonContent,
    IonList,
    IonMenuToggle,
    IonItem,
    IonIcon,
    IonLabel,
    IonRouterOutlet
  ]
})
export class AppComponent implements OnInit, OnDestroy {

  appPages: MenuItem[] = [];
  perfil: UserRole | null = null;

  menuDisponivel = signal(false);
  carregandoPerfil = true;

  private navigationSubscription?: Subscription;
  private authSubscription?: {
    unsubscribe: () => void;
  };

  private versaoConsulta = 0;

  constructor(
    public router: Router,
    private auth: AuthService,
    private supabase: SupabaseService,
    private zone: NgZone
  ) {
    addIcons({
      gridOutline,
      peopleOutline,
      businessOutline,
      briefcaseOutline,
      barChartOutline,
      settingsOutline,
      personCircleOutline,
      documentTextOutline,
      homeOutline,
      personOutline,
      cardOutline,
      walletOutline,
      addCircleOutline
    });
  }

  private limparMenu() {
  this.zone.run(() => {
    this.perfil = null;
    this.appPages = [];
    this.menuDisponivel.set(false);
    });
  }

  ngOnInit() {
    this.navigationSubscription = this.router.events
      .pipe(
        filter(
          (event): event is NavigationEnd =>
            event instanceof NavigationEnd
        )
      )
      .subscribe(() => {
        this.atualizarMenu();
      });

    const { data } =
      this.supabase.client.auth.onAuthStateChange((event) => {
  if (event === 'SIGNED_OUT') {
    this.versaoConsulta++;
    this.limparMenu();
  }

  setTimeout(() => {
    this.atualizarMenu();
  }, 0);
});

    this.authSubscription = data.subscription;

    this.atualizarMenu();
  }

  ngOnDestroy() {
    this.versaoConsulta++;

    this.navigationSubscription?.unsubscribe();
    this.authSubscription?.unsubscribe();
  }

  get tituloPerfil(): string {
    switch (this.perfil) {
      case 'admin':
        return 'Administrador';

      case 'associado':
        return 'Usuário / Associado';

      case 'empresa':
        return 'Empresa';

      default:
        return 'IAPEP';
    }
  }

  get tituloSecao(): string {
    switch (this.perfil) {
      case 'admin':
        return 'ADMINISTRAÇÃO';

      case 'associado':
        return 'ÁREA DO ASSOCIADO';

      case 'empresa':
        return 'ÁREA EMPRESARIAL';

      default:
        return 'SISTEMA INTERATIVO';
    }
  }

  private async atualizarMenu() {
  const versaoAtual = ++this.versaoConsulta;

  this.carregandoPerfil = true;

  try {

    const usuario = await this.supabase.getCurrentUser();

    if (versaoAtual !== this.versaoConsulta) {
      return;
    }

    if (!usuario) {
      this.limparMenu();
      return;
    }

    const perfil = await this.auth.getRole();

    if (versaoAtual !== this.versaoConsulta) {
      return;
    }

    this.zone.run(() => {
      this.perfil = perfil;

      const rota = this.router.url;

      const autorizado =
        perfil === 'admin' &&
        rota.startsWith('/admin');

      this.appPages = autorizado ? MENU_ADMIN : [];
      this.menuDisponivel.set(autorizado);
    });

  } catch (error) {
    if (versaoAtual === this.versaoConsulta) {
      this.limparMenu();
      console.error('Erro ao atualizar menu:', error);
    }
  } finally {
    if (versaoAtual === this.versaoConsulta) {
      this.carregandoPerfil = false;
    }
  }
  }
}
