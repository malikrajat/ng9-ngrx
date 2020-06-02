import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    loadChildren: () =>
      import('./user/user.module').then((user) => user.UserModule),
  },
  {
    path: 'user',
    pathMatch: 'full',
    loadChildren: () =>
      import('./user/user.module').then((user) => user.UserModule),
  },
  {
    path: 'post',
    pathMatch: 'full',
    loadChildren: () =>
      import('./post/post.module').then((post) => post.PostModule),
  },
  {
    path: '**',
    loadChildren: () =>
      import('./user/user.module').then((user) => user.UserModule),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
