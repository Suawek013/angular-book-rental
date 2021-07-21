import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

import { Book } from './book.model';
import { Borrow } from './borrow/borrow.model';
import { environment } from '../environments/environment';

const apiUrl = environment.apiUrl;

@Injectable({ providedIn: 'root' })
export class BooksService {
  constructor(private http: HttpClient) { }
  private books: Book[] = [];
  private booksUpdated = new Subject<Book[]>();

  getBooksByData(bookDataId: string) {
    this.http
      .get<{ message: string; books: Book[] }>(
        apiUrl + '/api/books/book_data/' + bookDataId
      )
      .subscribe((data) => {
        this.books = data.books;
        this.booksUpdated.next([...this.books]);
      });
  }

  getBooksUpdateListener() {
    return this.booksUpdated.asObservable();
  }

  getBooksWithData() {
    return this.http.get<{ message: string; books: any }>(
      apiUrl + '/api/books/book_data'
    );
  }

  getDataByBookID(bookId: string) {
    return this.http.get<{ message: string; books: any }>(
      apiUrl + '/api/books/bookId/' + bookId
    );
  }

  addBook(bookDataId: string) {
    this.http
      .post<{ message: string; book: Book }>(apiUrl + '/api/books', {
        bookDataId,
      })
      .subscribe((responseData) => {
        this.books.push(responseData.book);
        this.booksUpdated.next([...this.books]);
      });
  }

  deleteBook(bookId: string) {
    this.http.delete(apiUrl + '/api/books/' + bookId).subscribe(() => {
      const updatedBooks = this.books.filter((book) => book.id !== bookId);
      this.books = updatedBooks;
      this.booksUpdated.next([...this.books]);
    });
  }
}
