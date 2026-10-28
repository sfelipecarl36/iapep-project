import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

import { SupabaseService } from '../services/supabase.service';
import { AuthService } from '../services/auth.service';

export const associadoGuard: CanActivateFn = async () => {
  const router = inject(Router);
  const supabase = inject(SupabaseService);
  const auth = inject(AuthService);

  try {
    const usuario = await supabase.getCurrentUser();

    

    if (!usuario) {
      console.warn('[GUARD] Sem sessão. Redirecionando para login.');
      return router.createUrlTree(['/auth/login']);
    }

    const perfil = await auth.getRole();

    

    if (perfil === 'admin' || perfil === 'associado') {
      
      return true;
    }

    console.warn('[GUARD] Perfil sem permissão:', perfil);
    return router.createUrlTree(['/auth/aguardando']);

  } catch (error) {
    console.error('[GUARD] Erro na verificação:', error);
    return router.createUrlTree(['/auth/login']);
  }
};