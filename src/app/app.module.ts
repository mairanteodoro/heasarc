import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
// Materialize CSS
import { MaterializeModule } from 'angular2-materialize';
// Angular 2 date picker (https://www.npmjs.com/package/angular2-datepicker)
import { MyDatePickerModule } from 'mydatepicker';
// HTTP service
import { HttpService } from './http.service';
// routing
import { routing } from './app.routing';

import { AppComponent } from './app.component';
import { HomeComponent } from './home.component';
import { ConvCoordComponent } from './tools/conv-coord.component';
import { ConvEnergyComponent } from './tools/conv-energy.component';
import { MultiplexEnergyComponent } from './tools/multiplex-energy.component';
import { ColDenComponent } from './tools/col-den.component';
import { TimeDateComponent } from './tools/time-date.component';
import { UadComponent } from './tools/uad.component';
import { EnergyComponent } from './tools/energy.component';
import { FormatResultPipe } from './tools/format-result.pipe';
import { FormatCoordPipe } from './tools/format-coord.pipe';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ConvCoordComponent,
    ConvEnergyComponent,
    MultiplexEnergyComponent,
    ColDenComponent,
    TimeDateComponent,
    UadComponent,
    EnergyComponent,
    FormatResultPipe,
    FormatCoordPipe
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    MaterializeModule,
    routing,
    MyDatePickerModule,
  ],
  providers: [HttpService],
  bootstrap: [AppComponent]
})
export class AppModule { }
