import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Home } from './heroesCollection/home/home.component';
import { Store } from './heroesCollection/store/store.component';
import { UserHeroesCollection } from './heroesCollection/user-heroes-collection/user-heroes-collection.component';

const routes: Routes = [
  { path: 'Home', component: Home },
  {path: 'UserHeroesCollection', component: UserHeroesCollection},
  {path: 'Store', component: Store}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
