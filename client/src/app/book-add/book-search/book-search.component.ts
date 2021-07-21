import { Component } from '@angular/core';
import { GoogleBooksService } from './google-books.service';
import { Subscription } from 'rxjs';
import { Book_data } from '../../book_data.model';
import { BooksDataService } from 'src/app/books-data.service';
import { BooksService } from 'src/app/books.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-book-search',
  templateUrl: 'book-search.component.html',
  styleUrls: ['book-search.component.css', '../book-add.component.css'],
})
export class BookSearchComponent {
  books: Book_data[] = [];
  private booksSub: Subscription;
  searchValue = '';
  isLoading = false;

  constructor(
    private googleBooksService: GoogleBooksService,
    private booksDataService: BooksDataService,
    private booksService: BooksService,
    readonly snackBar: MatSnackBar
  ) { }

  update(value: string) {
    document.querySelector('.info-text').innerHTML = '';
    this.isLoading = true;
    this.searchValue = value;
    this.googleBooksService.searchBook(this.searchValue);
  }

  onSave(book: Book_data) {
    this.booksDataService
      .addBook(
        book.title.toString(),
        book.description.toString(),
        book.publication_date.toString(),
        book.author.toString(),
        book.publisher.toString(),
        book.image.toString(),
        book.isbn.toString()
      )
      .subscribe((responseData) => {
        this.snackBar.open(responseData.message, '', { horizontalPosition: 'start', duration: 4000, panelClass: ['snackBar'] });
        // window.alert(responseData.message);
        this.booksService.addBook(responseData.bookId);
      });
  }

  ngOnInit() {
    this.booksSub = this.googleBooksService
      .getBooksUpdateListener()
      .subscribe((books: Book_data[]) => {
        this.books = books;
        this.isLoading = false;
        if (this.books.length <= 0) {
          document.querySelector('.info-text').innerHTML =
            'Nie znaleziono książki o podanych kryteriach';
        } else {
          document.querySelector('.info-text').innerHTML = '';
        }
      });
  }
}
