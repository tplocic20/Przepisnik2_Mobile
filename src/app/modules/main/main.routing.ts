import {NgModule} from '@angular/core';
import {RouterModule, Routes} from "@angular/router";
import {HomePage} from "./components/home/home.page";
import {StartPage} from "./components/start/start";
import {LoginPage} from "./components/login/login";
import {TabsPage} from "./components/tabs/tabs";
import {RecipesModule} from "../recipes/recipes.module";

const routes: Routes = [
  {
    path: 'home',
    component: HomePage
  },
  {
    path: 'start',
    component: StartPage
  },
  {
    path: 'login',
    component: LoginPage
  },
  {
    path: 'nav',
    component: TabsPage,
    children: [
      {
        path: 'recipes',
        loadChildren: () => import('../recipes/recipes.module').then(m => m.RecipesModule)
      },
      {
        path: '',
        redirectTo: 'recipes',
        pathMatch: 'full'
      }
    ]
  },
  {
    path: '',
    redirectTo: 'start',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MainRouting {
}
