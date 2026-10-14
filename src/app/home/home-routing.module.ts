import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomePage } from './home.page';

const routes: Routes = [
  {
    path: '',
    component: HomePage,
    children:[
      {
        path:'', redirectTo:'explore', pathMatch:'full'
      },
      {
        path:'explore',
        loadChildren: ()=> import('./tabs/explore/explore.module').then(m => m.ExplorePageModule)
      },
      {
        path: 'city',
        loadChildren: () => import('./tabs/city/city.module').then( m => m.CityPageModule)
      },
      {
        path: 'table',
        loadChildren: () => import('./tabs/table/table.module').then( m => m.TablePageModule)
      },
      {
        path: 'lineups',
        loadChildren: () => import('./tabs/lineups/lineups.module').then( m => m.LineupsPageModule)
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomePageRoutingModule {}
