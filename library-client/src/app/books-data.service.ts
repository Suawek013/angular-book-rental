import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

import { Book_data } from './book_data.model';
import { environment } from '../environments/environment';

const apiUrl = environment.apiUrl;

@Injectable({ providedIn: 'root' })
export class BooksDataService {
  private books: Book_data[] = [];
  private booksUpdated = new Subject<Book_data[]>();

  constructor(private http: HttpClient) { }

  getBooks() {
    this.http
      .get<{ message: string; books: any }>(apiUrl + '/api/books_data')
      .subscribe((data) => {
        this.books = data.books;
        this.booksUpdated.next([...this.books]);
      });
  }

  getBook(id: string) {
    return this.http.get<{
      id: string;
      title: string;
      description: string;
      publication_date: string;
      author: string;
      publisher: string;
      image: string;
      isbn: string;
    }>(apiUrl + '/api/books_data/' + id);
  }

  getBooksUpdateListener() {
    return this.booksUpdated.asObservable();
  }

  checkISBN(isbn: string) {
    return this.http.get<{ message: string; isValid: boolean }>(
      apiUrl + '/api/books_data/isbn/' + isbn
    );
  }

  addBook(
    title: string,
    description: string,
    publication_date: string,
    author: string,
    publisher: string,
    image: string,
    isbn: string
  ) {
    const book: Book_data = {
      id: null,
      title: title,
      description: description,
      publication_date: publication_date,
      author,
      publisher,
      image,
      isbn,
    };
    return this.http.post<{ message: string; bookId: string }>(
      apiUrl + '/api/books_data',
      book
    );
    // .subscribe((responseData) => {
    //   book.id = responseData.bookId;
    //   this.books.push(book);
    //   this.booksUpdated.next([...this.books]);
    // });
  }

  deleteBook(id: string) {
    this.http
      .delete<{ message: string }>(apiUrl + '/api/books_data/' + id)
      .subscribe(() => {
        const updatedBooks = this.books.filter((book) => book.id !== id);
        this.books = updatedBooks;
        this.booksUpdated.next([...this.books]);
      });
  }

  updateBook(
    id: string,
    title: string,
    description: string,
    publication_date: string,
    author: string,
    publisher: string,
    image: string,
    isbn: string
  ) {
    const book: Book_data = {
      id,
      title,
      description,
      publication_date,
      author,
      publisher,
      image,
      isbn,
    };
    this.http
      .put(apiUrl + '/api/books_data/' + id, book)
      .subscribe((responseData) => {
        const updatedBooks = [...this.books];
        const oldBookIndex = updatedBooks.findIndex((p) => p.id === book.id);
        updatedBooks[oldBookIndex] = book;
        this.books.push(book);
        this.booksUpdated.next([...this.books]);
      });
  }
}
