import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: '/user',
  },
  {
    path: 'user',
    loadChildren: () =>
      import('./user/user.module').then((user) => user.UserModule),
  },
  {
    path: 'post',
    loadChildren: () =>
      import('./post/post.module').then((post) => post.PostModule),
  },
  // {
  //   path: '**',
  //   pathMatch: 'full',
  //   redirectTo: '/user',
  // },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
