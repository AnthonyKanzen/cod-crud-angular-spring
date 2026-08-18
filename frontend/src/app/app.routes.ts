import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'beginning',
    pathMatch: 'full'
  },
  {
    path: 'beginning',
    loadChildren: () =>
      import('./beginning/beginning.routes').then(
        m => m.BEGINNING_ROUTES
      )
  }
];
