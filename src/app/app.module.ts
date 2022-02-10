import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from "@angular/forms";
import { Routes, RouterModule } from "@angular/router";

import { AppComponent } from './app.component';
import {HttpClient, HttpClientModule, HttpHandler} from "@angular/common/http";
import { NotFoundComponent } from './not-found/not-found.component';
import { BrokersComponent } from './brokers/brokers.component';
import {MAT_DIALOG_DEFAULT_OPTIONS} from "@angular/material/dialog";
import { StocksComponent } from './stocks/stocks.component';
import { SettingsComponent } from './settings/settings.component';

const appRoutes: Routes = [
  {path: "brokers", component: BrokersComponent},
  {path: "stocks", component: StocksComponent},
  {path: "settings", component: SettingsComponent},
  {path: "**", component: NotFoundComponent}
];

@NgModule({
  declarations: [
    AppComponent,
    NotFoundComponent,
    BrokersComponent,
    StocksComponent,
    SettingsComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    RouterModule.forRoot(appRoutes)
  ],
  exports: [RouterModule],
  providers: [
                HttpClient,
                {provide: MAT_DIALOG_DEFAULT_OPTIONS, useValue: {hasBackdrop: false}}
             ],
  bootstrap: [AppComponent]
})
export class AppModule {  }
