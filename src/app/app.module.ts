// ------------------------------------------------------------------------------
// ----- app.module -------------------------------------------------------------
// ------------------------------------------------------------------------------

// copyright:   2016 WiM - USGS
//
// authors:  Tonia Roddick USGS Wisconsin Internet Mapping             
//
// purpose: main app module

import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule, Routes } from '@angular/router';
// import { ModalModule } from 'ngx-bootstrap/modal';
import { TooltipModule } from 'ngx-bootstrap/tooltip';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing/app-routing';

import { ProjectlistModule } from './projectlist/projectlist.module';
import { PageNotFoundComponent } from './not-found/not-found.component';
import { AuthGuard } from "app/auth-guard.service";
import { LoginRoutingModule } from "app/login/login-routing.module";
import { LoginComponent } from "app/login/login.component";
import { CanDeactivateGuard } from "app/candeactivate-guard.service";
// import { PipesModule } from "app/shared/pipes/pipes.module";
import { SharedModule } from "app/shared/shared.module";

@NgModule({
  declarations: [ AppComponent, LoginComponent, PageNotFoundComponent ],// Your components should go here 
  imports: [
    BrowserModule, FormsModule, HttpModule, SharedModule, TooltipModule.forRoot(), ProjectlistModule, LoginRoutingModule, AppRoutingModule
  ],// Your module imports should go here
  providers: [AuthGuard, CanDeactivateGuard],// LookupsService],// Your global providers should go here
  bootstrap: [AppComponent]
})
export class AppModule { }