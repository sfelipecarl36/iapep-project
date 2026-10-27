
import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'admin/visao-geral',
    pathMatch: 'full'
  },
  {
    path: 'admin/visao-geral',
    loadComponent: () =>
      import('./pages/admin/visao-geral/visao-geral.page')
        .then(m => m.VisaoGeralPage)
  },

  {
  path: 'admin/associados',
  loadComponent: () =>
    import('./pages/admin/associados/associados.page')
      .then(m => m.AssociadosPage)
  },

  {
    path: 'admin/:folder',
    loadComponent: () =>
      import('./folder/folder.page')
        .then(m => m.FolderPage)
  },
  {
    path: '**',
    redirectTo: 'admin/visao-geral'
  },
  {
    path: 'associados',
    loadComponent: () => import('./pages/admin/associados/associados.page').then( m => m.AssociadosPage)
  }
];
