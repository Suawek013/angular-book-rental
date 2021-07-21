import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { BookListComponent } from './book-list/book-list.component';

import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { AppRoutingModule } from './app-routing.module';
import { LoginComponent } from './auth/login/login.component';
import { SignupComponent } from './auth/signup/signup.component';
import { AuthComponent } from './auth/auth.component';
import { UserListComponent } from './auth/user-list/user-list.component';
import { UserPanelComponent } from './auth/user-panel/user-panel.component';
import { BookComponent } from './book-list/book/book.component';
import { AngularMaterialModule } from './angular-material.module';
import { SharedModule } from './shared/shared.module';
import { firstAdminComponent } from './auth/first-admin/first-admin.component';
import { ConfigurationFormComponent } from './auth/user-list/configuration-form/configuration-form.component';
import { BorrowListComponent } from './borrow/borrow-list.component';
import { BorrowTableComponent } from './auth/user-list/borrow-table/borrow-table.component';
import { UserBorrowTableComponent } from './auth/user-list/user-borrow-table/user-borrow-table.component';
import { AdminPanelHeaderComponent } from './auth/user-list/admin-panel-header/admin-panel-header.component';
import { BorrowListHeaderComponent } from './borrow/borrow-list-header/borrow-list-header.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    BookListComponent,
    PageNotFoundComponent,
    LoginComponent,
    SignupComponent,
    AuthComponent,
    UserListComponent,
    UserPanelComponent,
    BookComponent,
    firstAdminComponent,
    ConfigurationFormComponent,
    BorrowListComponent,
    BorrowTableComponent,
    UserBorrowTableComponent,
    AdminPanelHeaderComponent,
    BorrowListHeaderComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    BrowserAnimationsModule,
    FormsModule,
    AppRoutingModule,
    AngularMaterialModule,
    SharedModule,
  ],
  // providers: [{provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true}],
  bootstrap: [AppComponent],
})
export class AppModule { }
