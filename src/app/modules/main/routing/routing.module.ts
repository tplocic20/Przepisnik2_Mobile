import {NgModule} from '@angular/core';
import {RouterModule, Routes} from "@angular/router";
import {HomePage} from "../components/home/home.page";

const routes: Routes = [
  {
    path: 'home',
    component: HomePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RoutingModule {
}
