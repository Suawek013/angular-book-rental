import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './auth/auth.guard';
import { UserPanelComponent } from './auth/user-panel/user-panel.component';

import { BookListComponent } from './book-list/book-list.component';
import { BookComponent } from './book-list/book/book.component';
import { BorrowListComponent } from './borrow/borrow-list.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { UserListComponent } from './auth/user-list/user-list.component';
import { BorrowTableComponent } from './auth/user-list/borrow-table/borrow-table.component';
import { UserBorrowTableComponent } from './auth/user-list/user-borrow-table/user-borrow-table.component';
import { ConfigurationFormComponent } from './auth/user-list/configuration-form/configuration-form.component';

const appRoutes: Routes = [
  { path: '', component: BookListComponent },
  { path: 'book/:id', component: BookComponent },
  { path: 'book-add', loadChildren: () => import('./book-add/book-add.module').then((m) => m.BookAddModule), canActivate: [AuthGuard], },
  { path: 'user-panel', component: UserPanelComponent, canActivate: [AuthGuard], },
  { path: 'user-list', component: UserListComponent, canActivate: [AuthGuard] },
  { path: 'borrow-list', component: BorrowListComponent, canActivate: [AuthGuard] },
  { path: 'borrow-table', component: BorrowTableComponent, canActivate: [AuthGuard] },
  { path: 'configuration-form', component: ConfigurationFormComponent, canActivate: [AuthGuard] },
  { path: 'user-borrow-table/:id', component: UserBorrowTableComponent, canActivate: [AuthGuard] },
  { path: 'not-found', component: PageNotFoundComponent, data: { message: 'Page not found!' }, },
  { path: '**', redirectTo: '/not-found' },
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule],
  providers: [AuthGuard],
})
export class AppRoutingModule { }
