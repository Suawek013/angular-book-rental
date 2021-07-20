import { AfterContentInit, Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Subscription } from 'rxjs';
import { Book_data } from 'src/app/book_data.model';
import { BooksDataService } from 'src/app/books-data.service';
import { AuthService } from 'src/app/auth/auth.service';
import { BooksService } from 'src/app/books.service';
import { Book } from 'src/app/book.model';
import { BorrowService } from 'src/app/borrow/borrow.service';
import { Borrow } from '../../borrow/borrow.model';
import { Category } from 'src/app/category.model';
import { BooksByCategoryService } from 'src/app/books-by-category.service';

declare var bookSlide: Function;

declare var bookStickyHeader: Function;

@Component({
  selector: 'app-book',
  templateUrl: './book.component.html',
  styleUrls: ['./book.component.css'],
})
export class BookComponent implements OnInit, AfterContentInit, OnDestroy {
  private bookId: string;
  book_data: Book_data;
  book: Book;
  userPermission = '';
  userId = '';
  userEmail = '';
  borrow: any;
  categories: Category[];

  private getUserPermissionListener: Subscription;
  private authListenerSubs: Subscription;
  private userIdListener: Subscription;

  bookIsBorrowed = false;
  userIsDifferent = false;
  userIsAuthenticated = false;

  private getUserEmailListener: Subscription;
  private bookByCatSub: Subscription;

  constructor(
    private authService: AuthService,
    private route: ActivatedRoute,
    private booksDataService: BooksDataService,
    private booksService: BooksService,
    private borrowService: BorrowService,
    private booksByCatService: BooksByCategoryService
  ) {}

  ngAfterContentInit() {
    bookSlide();
    window.onscroll = function () {
      bookStickyHeader();
    };
  }

  ngOnInit(): void {
    this.userIsAuthenticated = this.authService.getIsAuth();
    this.authListenerSubs = this.authService
      .getAuthStatusLisener()
      .subscribe((isAuthenticated) => {
        this.userIsAuthenticated = isAuthenticated;
      });

    this.userId = this.authService.getUserId();
    this.userIdListener = this.authService
      .getUserIdListener()
      .subscribe((userId) => {
        this.userId = userId;
      });

    this.userEmail = this.authService.getUserEmail();
    this.getUserEmailListener = this.authService
      .getUserEmailListener()
      .subscribe((email) => {
        this.userEmail = email;
      });

    this.route.paramMap.subscribe((paramMap: ParamMap) => {
      if (paramMap.has('id')) {
        this.bookId = paramMap.get('id');
        //Find Data assigned to Book
        this.booksService.getDataByBookID(this.bookId).subscribe((result) => {
          this.book = {
            id: result.books.id,
            book_data_id: result.books.book_data_id,
            date_added: result.books.date_added,
          };
          this.book_data = {
            id: result.books.book_data_id,
            title: result.books.title,
            description: result.books.description,
            publication_date: result.books.publication_date,
            author: result.books.author,
            publisher: result.books.publisher,
            image: result.books.image,
            isbn: result.books.isbn,
          };
          //Find Categories assigned to book
          this.booksByCatService.getCategoriesByBook(result.books.book_data_id);
          this.bookByCatSub = this.booksByCatService
            .getCategoriesUpdateListener()
            .subscribe((categories) => {
              this.categories = categories;
              this.categories.forEach((element, i) => {
                if (element[i] == this.categories.length) {
                  console.log('true');
                }
              });
              console.log(this.categories.length);
            });
        });
        //Check whether Book is borrowed
        this.getStatus();
      }
    });
  }

  UNtoggle() {
    document.getElementById('curtain').style.opacity = '0';
    document.getElementById('curtain').style.zIndex = '-100';
    document.getElementById('popup').style.opacity = '0';
    document.getElementById('popup').style.zIndex = '-2';
    document.getElementById('popup').style.width = '0vw';
    document.getElementById('popup').style.height = '0vh';
  }

  getStatus() {
    //Disable Borrow button if Book is not available
    if (this.userIsAuthenticated) {
      this.borrowService
        .getBorrowStatus(this.userId, this.bookId)
        .subscribe((response) => {
          this.userIsDifferent = response.userIsDifferent;
          this.bookIsBorrowed = response.isBorrowed;
          document.querySelector('button').disabled = false;
          if (typeof response.borrow !== 'undefined') {
            this.borrow = response.borrow;
          }
          return this.bookIsBorrowed;
        });
    }
  }

  borrowBook(userId, bookId) {
    document.querySelector('button').disabled = true;
    var date = new Date().toLocaleString();
    this.borrowService
      .borrowBook(userId, bookId, date)
      .subscribe((response) => {
        this.getStatus();
      });
  }

  returnBook(userId, bookId) {
    document.querySelector('button').disabled = true;
    var date = new Date().toLocaleString();
    this.borrowService
      .returnBook(userId, bookId, date)
      .subscribe((response) => {
        this.getStatus();
      });
  }

  ngOnDestroy() {
    //Unsubscribe on leave
    this.bookByCatSub.unsubscribe();
  }
}
