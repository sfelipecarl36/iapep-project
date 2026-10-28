
import { Routes } from '@angular/router';

import { adminGuard } from './guards/admin.guard';
import { authGuard } from './guards/auth.guard';
import { associadoGuard } from './guards/associado.guard';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'auth/login',
    pathMatch: 'full'
  },
  {
    path: 'auth/login',
    loadComponent: () =>
      import('./pages/auth/login/login.page')
        .then(m => m.LoginPage)
  },
  {
    path: 'auth/aguardando',
    canActivate: [authGuard],
    loadComponent: () =>
      import('./pages/auth/aguardando/aguardando.page')
        .then(m => m.AguardandoPage)
  },
  {
    path: 'admin',
    canActivate: [adminGuard],
    children: [
      {
        path: '',
        redirectTo: 'visao-geral',
        pathMatch: 'full'
      },
      {
        path: 'visao-geral',
        loadComponent: () =>
          import('./pages/admin/visao-geral/visao-geral.page')
            .then(m => m.VisaoGeralPage)
      },
      {
        path: 'associados',
        loadComponent: () =>
          import('./pages/admin/associados/associados.page')
            .then(m => m.AssociadosPage)
      },
      {
        path: 'propostas',
        loadComponent: () =>
          import('./pages/admin/propostas/propostas.page')
            .then(m => m.PropostasPage)
      },
      {
        path: ':folder',
        loadComponent: () =>
          import('./folder/folder.page')
            .then(m => m.FolderPage)
      }
    ]
  },

  {
  path: 'associado/meu-painel',
  canActivate: [associadoGuard],
  loadComponent: () =>
    import('./pages/associado/meu-painel/meu-painel.page')
      .then(m => m.MeuPainelPage)
  },

  {
  path: 'associado/meu-cadastro',
  canActivate: [associadoGuard],
  loadComponent: () =>
    import('./pages/associado/meu-cadastro/meu-cadastro.page')
      .then(m => m.MeuCadastroPage)
},

{
  path: 'associado/proposta',
  canActivate: [associadoGuard],
  loadComponent: () =>
    import('./pages/associado/proposta/proposta.page')
      .then(m => m.PropostaPage)
},

  {
    path: '**',
    redirectTo: 'auth/login'
  },
  
];
