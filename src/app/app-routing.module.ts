import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Home } from './heroesCollection/home/home.component';
import { Store } from './heroesCollection/store/store.component';
import { UserHeroesCollection } from './heroesCollection/user-heroes-collection/user-heroes-collection.component';
import { UserHeroesCollection2 } from './heroesCollection/user-heroes-collection2/user-heroes-collection2.component';

const routes: Routes = [
  { path: 'Home', component: Home },
  {path: 'UserHeroesCollection', component: UserHeroesCollection},
  {path: 'UserHeroesCollection2', component: UserHeroesCollection2},
  {path: 'Store', component: Store}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
