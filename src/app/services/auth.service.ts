import { Injectable } from '@angular/core';
import { SupabaseService } from './supabase.service';

export type UserRole =
  | 'admin'
  | 'associado'
  | 'empresa';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(
    private supabase: SupabaseService
  ) {}

  async getRole(): Promise<UserRole | null> {
    const user = await this.supabase.getCurrentUser();

    if (!user) {
      return null;
    }

    const { data, error } = await this.supabase.client
      .from('user_roles')
      .select('role')
      .eq('user_id', user.id)
      .maybeSingle();

    if (error) {
      throw error;
    }

    if (
      data?.role === 'admin' ||
      data?.role === 'associado' ||
      data?.role === 'empresa'
    ) {
      return data.role;
    }

    return null;
  }

  async getDestination(): Promise<string> {
  const user = await this.supabase.getCurrentUser();

  if (!user) {
    return '/auth/login';
  }

  const role = await this.getRole();

  if (role === 'admin') {
    return '/admin/visao-geral';
  }

  if (role === 'empresa') {
    return '/auth/aguardando';
  }

  return '/associado/meu-painel';
}
}