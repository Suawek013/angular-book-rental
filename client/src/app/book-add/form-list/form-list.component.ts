import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';

import { Book_data } from '../../book_data.model';
import { BooksDataService } from '../../books-data.service';

@Component({
  selector: 'app-form-list',
  templateUrl: './form-list.component.html',
  styleUrls: ['./form-list.component.css', '../book-add.component.css'],
})
export class FormList implements OnInit, OnDestroy {
  books: Book_data[] = [];
  isLoading = false;
  searchText = '';
  private booksSub: Subscription;

  constructor(public booksDataService: BooksDataService) {}

  onDelete(bookId: string) {
    this.booksDataService.deleteBook(bookId);
  }

  ngOnInit() {
    this.isLoading = true;
    this.booksDataService.getBooks();
    this.booksSub = this.booksDataService
      .getBooksUpdateListener()
      .subscribe((books: Book_data[]) => {
        this.isLoading = false;
        this.books = books;
      });
  }
  ngOnDestroy() {
    this.booksSub.unsubscribe();
  }
}
