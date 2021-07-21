import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BookAddComponent } from './book-add.component';
import { BookFormComponent } from './book-form/book-form.component';
import { FormList } from './form-list/form-list.component';
import { BookSearchComponent } from './book-search/book-search.component';
import { CategoryEditComponent } from './category-edit/category-edit.component';

const routes: Routes = [
  {
    path: '',
    component: BookAddComponent,
    children: [
      {
        path: 'book-form',
        component: BookFormComponent,
      },
      {
        path: 'book-search',
        component: BookSearchComponent,
      },
      {
        path: 'category-edit',
        component: CategoryEditComponent,
      },
      { path: 'book-list', component: FormList },
      {
        path: 'edit/:id',
        component: BookFormComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BookAddRoutingModule {}
