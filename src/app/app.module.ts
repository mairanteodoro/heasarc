import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
// Materialize CSS
import { MaterializeModule } from 'angular2-materialize';
// HTTP service
import { HttpService } from './http.service';
// routing
import { routing } from './app.routing';

import { AppComponent } from './app.component';
import { HomeComponent } from './home.component';
import { ConvCoordComponent } from './tools/conv-coord.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ConvCoordComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    MaterializeModule,
    routing,
  ],
  providers: [HttpService],
  bootstrap: [AppComponent]
})
export class AppModule { }
