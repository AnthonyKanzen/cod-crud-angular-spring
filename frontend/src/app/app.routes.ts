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
  },

  {
    path: 'beginning/new',
    loadComponent: () =>
      import('./beginning-form/beginning-form.component')
        .then(m => m.BeginningFormComponent)
  },

  {
  path: 'beginning/edit/:id',
  loadComponent: () =>
    import('./beginning-edit/beginning-edit.component')
      .then(m => m.BeginningEditComponent)
}

];
