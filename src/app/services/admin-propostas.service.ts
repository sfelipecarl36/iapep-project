
import { Injectable } from '@angular/core';
import { SupabaseService } from './supabase.service';
import { PropostaAdmissao } from './proposta.service';

@Injectable({
  providedIn: 'root'
})
export class AdminPropostasService {

  constructor(
    private supabase: SupabaseService
  ) {}
  
    async analisarProposta(
    propostaId: string,
    decisao: 'aprovada' | 'rejeitada',
    observacao: string | null
    ): Promise<void> {

    const { error } = await this.supabase.client.rpc(
        'analisar_proposta',
        {
        p_proposta_id: propostaId,
        p_decisao: decisao,
        p_observacao: observacao
        }
    );

    if (error) {
        throw error;
    }
    }


  async listarPropostas(): Promise<PropostaAdmissao[]> {

    const usuario = await this.supabase.getCurrentUser();

    if (!usuario) {
      throw new Error('Usuário não autenticado.');
    }

    const { data, error } = await this.supabase.client
      .from('propostas_admissao')
      .select('*')
      .order('enviada_em', { ascending: false });

    if (error) {
      throw error;
    }

    return (data || []) as PropostaAdmissao[];
  }
}
