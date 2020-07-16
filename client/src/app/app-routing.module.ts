import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


const routes: Routes = [
  { 
    path: 'app', 
    children: [
      {
        path: 'home',
        loadChildren: () => import('./components/authors/authors.module').then(m => m.AuthorsModule)
      },
      {
        path: 'publications',
        loadChildren: () => import('./components/publications/publications.module').then(m => m.PublicationsModule)
      }
    ] },
  { path: '', redirectTo: '/app/home', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
