import { Routes, RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { HomeComponent } from './home.component';
import { ConvCoordComponent } from './tools/conv-coord.component';

const APP_ROUTES:Routes = [

  {path: 'tools', component: ConvCoordComponent},
  {path: '', component: HomeComponent}

]

export const routing = RouterModule.forRoot(APP_ROUTES);
