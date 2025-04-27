import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { MsalModule, MsalService, MsalGuard, MsalRedirectComponent, MSAL_INSTANCE, MSAL_GUARD_CONFIG } from '@azure/msal-angular';
import { PublicClientApplication, InteractionType } from '@azure/msal-browser';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from '../home/home.component';
import { AppRoutingModule } from './app-routing.module';
import { CommonService } from '../services/common.service';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { HeaderComponent } from './shared/header/header.component';
import { FooterComponent } from './shared/footer/footer.component';
import { LoginComponent } from './login/login.component';
import { FormsModule } from '@angular/forms';
import { MainLayoutComponent } from './layouts/main-layout/main-layout.component';
import { LoginLayoutComponent } from './layouts/login-layout/login-layout.component';
import { AuthInterceptor } from './interceptors/auth.interceptor';



@NgModule({
  declarations: [AppComponent, HomeComponent, HeaderComponent, FooterComponent, LoginComponent, MainLayoutComponent, LoginLayoutComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule  ,FormsModule 
  ],
  providers: [
    CommonService,
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
