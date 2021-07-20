import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

import { Book_data } from '../../book_data.model';

@Injectable({ providedIn: 'root' })
export class GoogleBooksService {
  private books: Book_data[] = [];
  private booksUpdated = new Subject<Book_data[]>();

  constructor(private http: HttpClient) {}

  item;
  placeHldr = 'placeholder';
  imgPlaceholder = 'assets/Images/image-not-found.jpg';

  searchBook(title: string) {
    if (!title) {
      this.books = [];
      this.booksUpdated.next([...this.books]);
      return;
    }
    this.http
      .get(
        `https://www.googleapis.com/books/v1/volumes?q=${title}&maxResults=15`
      )
      .subscribe((data) => {
        // console.log(data);
        this.displayResults(data);
      });
  }

  displayResults(res) {
    this.books = [];
    if (!res.items) {
      // window.alert('Nie znaleziono żadnych książek!');
      this.booksUpdated.next([...this.books]);
      return;
    }
    for (var i = 0; i < res.items.length; i++) {
      this.item = res.items[i];

      let authorArray = this.item.volumeInfo.authors
        ? this.item.volumeInfo.authors
        : '';
      const book: Book_data = {
        id: null,
        title: this.item.volumeInfo.title ? this.item.volumeInfo.title : '',
        description: this.item.volumeInfo.description
          ? this.item.volumeInfo.description
          : '',
        publication_date: this.item.volumeInfo.publishedDate
          ? this.item.volumeInfo.publishedDate
          : '',
        author: authorArray ? authorArray.join(', ') : '',
        publisher: this.item.volumeInfo.publisher
          ? this.item.volumeInfo.publisher
          : '',
        image: this.item.volumeInfo.imageLinks
          ? this.item.volumeInfo.imageLinks.thumbnail
          : this.imgPlaceholder,
        isbn: '',
      };
      if (!this.item.volumeInfo.industryIdentifiers) {
        book.isbn = '';
      } else {
        if (this.item.volumeInfo.industryIdentifiers.length == 0) {
          book.isbn = '';
        } else {
          if (this.item.volumeInfo.industryIdentifiers.length == 2) {
            book.isbn = this.item.volumeInfo.industryIdentifiers[1].identifier;
          } else {
            book.isbn = this.item.volumeInfo.industryIdentifiers[0].identifier;
          }
        }
      }
      if (book.publication_date.length < 7) {
        book.publication_date = '';
      }
      this.books.push(book);

      // console.log(book);
      // console.log(this.books[i]);

      // if(i>=10) { return; }
    }
    this.booksUpdated.next([...this.books]);
  }

  getBooksUpdateListener() {
    return this.booksUpdated.asObservable();
  }
}
