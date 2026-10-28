
import { Injectable } from '@angular/core';
import { SupabaseService } from './supabase.service';

export interface PerfilUsuario {
  id: string;
  nome_completo: string | null;
  email: string | null;
  telefone: string | null;
  cpf: string | null;
  rg: string | null;
  data_nascimento: string | null;
  naturalidade: string | null;
  nacionalidade: string | null;
  filiacao: string | null;

  crea_numero: string | null;
  crea_uf: string | null;
  titulo_profissional: string | null;

  foto_url: string | null;
}

export type DadosPerfil = Omit<PerfilUsuario, 'id'>;

@Injectable({
  providedIn: 'root'
})
export class PerfilService {

  constructor(
    private supabase: SupabaseService
  ) {}

  
async buscarPerfil(): Promise<PerfilUsuario | null> {
  console.log('[PERFIL] Buscando usuário autenticado...');

  const usuario = await this.supabase.getCurrentUser();

  console.log('[PERFIL] Usuário encontrado:', !!usuario);

  if (!usuario) {
    throw new Error('Usuário não autenticado.');
  }

  console.log('[PERFIL] Consultando tabela perfis...');

  const { data, error } = await this.supabase.client
    .from('perfis')
    .select('*')
    .eq('id', usuario.id)
    .maybeSingle();

  console.log('[PERFIL] Consulta concluída');

  if (error) {
    console.error('[PERFIL] Erro do Supabase:', error);
    throw error;
  }

  return data as PerfilUsuario | null;
}


  async salvarPerfil(dados: DadosPerfil): Promise<void> {
    const usuario = await this.supabase.getCurrentUser();

    if (!usuario) {
      throw new Error('Usuário não autenticado.');
    }

    const { error } = await this.supabase.client
      .from('perfis')
      .upsert(
        {
          ...dados,
          id: usuario.id,
          updated_at: new Date().toISOString()
        },
        {
          onConflict: 'id'
        }
      );

    if (error) {
      throw error;
    }
  }
}
