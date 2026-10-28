
import { Injectable } from '@angular/core';
import { SupabaseService } from './supabase.service';
import { PerfilService } from './perfil.service';

export type StatusProposta =
  | 'pendente'
  | 'aprovada'
  | 'rejeitada';

export interface PropostaAdmissao {
  id: string;
  usuario_id: string;
  status: StatusProposta;
  dados_enviados: Record<string, unknown>;
  observacao_admin: string | null;
  enviada_em: string;
  analisada_em: string | null;
  analisada_por: string | null;
}

@Injectable({
  providedIn: 'root'
})
export class PropostaService {

  constructor(
    private supabase: SupabaseService,
    private perfilService: PerfilService
  ) {}

  async buscarProposta(): Promise<PropostaAdmissao | null> {
    const usuario = await this.supabase.getCurrentUser();

    if (!usuario) {
      throw new Error('Usuário não autenticado.');
    }

    const { data, error } = await this.supabase.client
      .from('propostas_admissao')
      .select('*')
      .eq('usuario_id', usuario.id)
      .order('enviada_em', { ascending: false })
      .limit(1)
      .maybeSingle();

    if (error) throw error;

    return data as PropostaAdmissao | null;
  }

  async enviarProposta(): Promise<void> {
    const usuario = await this.supabase.getCurrentUser();

    if (!usuario) {
      throw new Error('Usuário não autenticado.');
    }

    const perfil = await this.perfilService.buscarPerfil();

    if (!perfil) {
      throw new Error(
        'Preencha seu cadastro antes de enviar a proposta.'
      );
    }

    if (
      !perfil.nome_completo?.trim() ||
      !perfil.cpf?.trim() ||
      !perfil.crea_numero?.trim() ||
      !perfil.crea_uf
    ) {
      throw new Error(
        'Preencha nome completo, CPF e dados do CREA antes de enviar.'
      );
    }

    const { id, ...dadosCadastro } = perfil;

    const { error } = await this.supabase.client
      .from('propostas_admissao')
      .insert({
        usuario_id: usuario.id,
        status: 'pendente',
        dados_enviados: dadosCadastro
      });

    if (error) throw error;
  }
}
