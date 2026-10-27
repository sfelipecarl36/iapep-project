
import { inject } from '@angular/core';
import {
  CanActivateFn,
  Router
} from '@angular/router';

import { SupabaseService } from '../services/supabase.service';

export const authGuard: CanActivateFn = async () => {
  const router = inject(Router);
  const supabase = inject(SupabaseService);

  try {
    const user = await supabase.getCurrentUser();

    return user
      ? true
      : router.createUrlTree(['/auth/login']);
  } catch {
    return router.createUrlTree(['/auth/login']);
  }
};
