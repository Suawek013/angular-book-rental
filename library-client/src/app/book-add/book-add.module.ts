import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { AngularMaterialModule } from '../angular-material.module';
import { BookFormComponent } from './book-form/book-form.component';
import { BookAddComponent } from './book-add.component';
import { BookSearchComponent } from './book-search/book-search.component';
import { BookHeaderComponent } from './book-header/book-header.component';
import { FormList } from './book-form/form-list/form-list.component';
import { SharedModule } from '../shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CategoryEditComponent } from './category-edit/category-edit.component';
import { BookAddRoutingModule } from './book-add-routing.module';

@NgModule({
  declarations: [
    BookFormComponent,
    BookAddComponent,
    BookSearchComponent,
    FormList,
    BookHeaderComponent,
    CategoryEditComponent,
  ],
  imports: [
    FormsModule,
    CommonModule,
    AngularMaterialModule,
    SharedModule,
    ReactiveFormsModule,
    BookAddRoutingModule,
  ],
})
export class BookAddModule {}
