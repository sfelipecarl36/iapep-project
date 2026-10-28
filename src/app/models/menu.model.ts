
export type PerfilAcesso =
  | 'admin'
  | 'associado'
  | 'empresa';

export interface MenuItem {
  titulo: string;
  rota: string;
  icone: string;
}

export const MENU_ADMIN: MenuItem[] = [
  {
    titulo: 'Visão Geral',
    rota: '/admin/visao-geral',
    icone: 'grid-outline'
  },
  {
    titulo: 'Associados',
    rota: '/admin/associados',
    icone: 'people-outline'
  },
  {
    titulo: 'Propostas',
    rota: '/admin/propostas',
    icone: 'document-text-outline'
  },
  {
    titulo: 'Empresas',
    rota: '/admin/empresas',
    icone: 'business-outline'
  },
  {
    titulo: 'Demandas',
    rota: '/admin/demandas',
    icone: 'briefcase-outline'
  },
  {
    titulo: 'Relatórios',
    rota: '/admin/relatorios',
    icone: 'bar-chart-outline'
  },
  {
    titulo: 'Configurações',
    rota: '/admin/configuracoes',
    icone: 'settings-outline'
  }
];

export const MENU_ASSOCIADO: MenuItem[] = [
  {
    titulo: 'Meu Painel',
    rota: '/associado/meu-painel',
    icone: 'home-outline'
  },
  {
    titulo: 'Meu Cadastro',
    rota: '/associado/meu-cadastro',
    icone: 'person-outline'
  },
  {
    titulo: 'Proposta de Admissão',
    rota: '/associado/proposta',
    icone: 'document-text-outline'
  },
  {
    titulo: 'Carteirinha Digital',
    rota: '/associado/carteirinha',
    icone: 'card-outline'
  },
  {
    titulo: 'Pagamentos',
    rota: '/associado/pagamentos',
    icone: 'wallet-outline'
  },
  {
    titulo: 'Demandas',
    rota: '/associado/demandas',
    icone: 'briefcase-outline'
  }
];

export const MENU_EMPRESA: MenuItem[] = [
  {
    titulo: 'Painel Empresarial',
    rota: '/empresa/painel',
    icone: 'grid-outline'
  },
  {
    titulo: 'Perfil da Empresa',
    rota: '/empresa/perfil',
    icone: 'business-outline'
  },
  {
    titulo: 'Publicar Demanda',
    rota: '/empresa/publicar-demanda',
    icone: 'add-circle-outline'
  },
  {
    titulo: 'Minhas Demandas',
    rota: '/empresa/demandas',
    icone: 'briefcase-outline'
  },
  {
    titulo: 'Candidatos',
    rota: '/empresa/candidatos',
    icone: 'people-outline'
  }
];
