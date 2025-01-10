import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {HomeComponent} from './home/home.component';
import {AuthenticationComponent} from './authentication/authentication.component';
import {InputTextModule} from "primeng/inputtext";
import {FormsModule} from "@angular/forms";
import {ButtonModule} from "primeng/button";
import {RippleModule} from "primeng/ripple";
import {ToggleButtonModule} from "primeng/togglebutton";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {HttpClientModule} from "@angular/common/http";
import {SharedModule} from "../shared/shared.module";

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    AuthenticationComponent
  ],
    imports: [
        BrowserModule, BrowserAnimationsModule,
        AppRoutingModule,
        InputTextModule,
        FormsModule,
        ButtonModule,
        RippleModule, HttpClientModule,
        ToggleButtonModule, SharedModule
    ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
