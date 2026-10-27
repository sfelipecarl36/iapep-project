
import { inject } from '@angular/core';
import {
  CanActivateFn,
  Router
} from '@angular/router';

import { SupabaseService } from '../services/supabase.service';
import { AuthService } from '../services/auth.service';

export const adminGuard: CanActivateFn = async () => {
  const router = inject(Router);
  const supabase = inject(SupabaseService);
  const auth = inject(AuthService);

  try {
    const user = await supabase.getCurrentUser();

    if (!user) {
      return router.createUrlTree(['/auth/login']);
    }

    const role = await auth.getRole();

    if (role !== 'admin') {
      return router.createUrlTree(['/auth/aguardando']);
    }

    return true;
  } catch {
    return router.createUrlTree(['/auth/aguardando']);
  }
};
