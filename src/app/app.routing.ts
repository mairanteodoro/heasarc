import { Routes, RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { HomeComponent } from './home.component';
import { ConvCoordComponent } from './tools/conv-coord.component';
import { ConvEnergyComponent } from './tools/conv-energy.component';
import { ColDenComponent } from './tools/col-den.component';
import { TimeDateComponent } from './tools/time-date.component';
import { UadComponent } from './tools/uad.component';

const APP_ROUTES:Routes = [

  // landing page
  {path: '', redirectTo: '/home', pathMatch: 'full'},
  //
  // home page
  //
  {path: 'home', component: HomeComponent},
  //
  // TOOLS
  //
  // coordinate converter page
  {path: 'coco', component: ConvCoordComponent},
  // energy converter page
  {path: 'enco', component: ConvEnergyComponent},
  // NH column density page
  {path: 'colden', component: ColDenComponent},
  // time/date page
  {path: 'timedate', component: TimeDateComponent},
  // energy converter page
  {path: 'uad', component: UadComponent},

]

export const routing = RouterModule.forRoot(APP_ROUTES);
