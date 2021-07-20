import {
  AfterContentInit,
  Component,
  ElementRef,
  OnDestroy,
  OnInit,
  QueryList,
  ViewChildren,
} from '@angular/core';
import * as data from '../../assets/bookList.json';
import { Book_data } from '../book_data.model';
import { BooksDataService } from '../books-data.service';
import { Category } from '../category.model';
import { CategoriesService } from '../categories.service';
import { BooksByCategoryService } from '../books-by-category.service';
import { Subscription } from 'rxjs';
import { AuthService } from '../auth/auth.service';
import { Book } from '../book.model';
import { BooksService } from '../books.service';
import { BorrowService } from '../borrow/borrow.service';
import { Borrow } from '../borrow/borrow.model';
import { environment } from '../../environments/environment';

const apiUrl = environment.apiUrl;

declare var stickyHeader: Function, btnGoTop: Function;

@Component({
  selector: 'app-book-list',
  templateUrl: './book-list.component.html',
  styleUrls: ['./book-list.component.css'],
})
export class BookListComponent implements OnInit, OnDestroy, AfterContentInit {
  @ViewChildren('checkboxes') checkboxes: QueryList<ElementRef>;
  searchText = '';
  booksjson: any = (data as any).default;
  books = [];
  categories: Category[] = [];
  selected = [];
  userEmail = '';
  isCloseTrue = false;
  borrows: Borrow[] = [];
  isAuthenticated = false;
  isBorrowedByMe = false;
  authStatusSub: Subscription;
  private borrowsSub: Subscription;
  private getUserEmailListener: Subscription;
  constructor(
    private booksDataService: BooksDataService,
    private categoriesService: CategoriesService,
    private booksByCatService: BooksByCategoryService,
    private authService: AuthService,
    private booksService: BooksService, // private BookComponent: BookComponent
    private borrowService: BorrowService
  ) {}

  ngAfterContentInit() {
    window.onscroll = function () {
      if (document.location.pathname === '/') {
        stickyHeader();
      }
    };
    if (document.location.pathname === '/') {
      btnGoTop();
    }
  }

  onFindByCategory(categoryId: string, event) {
    //Find Books assigned to selected category
    if (event.target.checked) {
      this.selected.push("'" + categoryId + "'");
    } else {
      for (var i = 0; i < this.categories.length; i++) {
        if (this.selected[i] == "'" + categoryId + "'") {
          this.selected.splice(i, 1);
        }
      }
    }
    if (this.selected.length === 0) {
      this.booksService.getBooksWithData().subscribe((documents) => {
        this.books = documents.books;
      });
    } else {
      this.booksByCatService
        .getBooksByCategories(this.selected)
        .subscribe((data) => {
          this.books = data.books;
        });
    }
  }

  // onFindByAvailability() {
  //   for (let i = 0; i < this.books.length; i++) {
  //     if (
  //       this.borrows[i].return_date != null
  //       )
  //       {
  //       this.booksService.getDataByBookID(this.borrows[i].book_id).subscribe((book) => {
  //          })
  //     }
  //   }
  // }

  checkIfBookIsBorrowed(bookId) {
    if (!this.isAuthenticated) {
      return false;
    }
    for (let i = 1; i < this.borrows.length; i++) {
      if (
        this.borrows[i].return_date == null &&
        bookId == this.borrows[i].book_id
      ) {
        return true;
      }
    }
    return false;
  }

  ngOnInit(): void {
    if (localStorage.getItem('token')) {
      this.isAuthenticated = true;
      this.borrowService.getBorrows();
      this.borrowsSub = this.borrowService
        .getBorrowsUpdatedListener()
        .subscribe((borrows: Borrow[]) => {
          // this.isLoading = false;
          this.borrows = borrows;
        });
    }
    this.authStatusSub = this.authService
      .getAuthStatusLisener()
      .subscribe((response) => {
        if (response) {
          this.isAuthenticated = true;
          this.borrowService.getBorrows();
          this.borrowsSub = this.borrowService
            .getBorrowsUpdatedListener()
            .subscribe((borrows: Borrow[]) => {
              // this.isLoading = false;
              this.borrows = borrows;
            });
        } else {
          this.isAuthenticated = false;
          this.borrows = [];
        }
      });
    // this.isAuthenticated = this.authService.getIsAuth();

    // if (this.isAuthenticated) {

    // }

    this.booksService.getBooksWithData().subscribe((documents) => {
      this.books = documents.books;
    });

    this.userEmail = this.authService.getUserEmail();
    this.getUserEmailListener = this.authService
      .getUserEmailListener()
      .subscribe((email) => {
        this.userEmail = email;
      });

    this.categoriesService.getCategories();
    this.categoriesService.getCategoriesUpdateListener().subscribe((data) => {
      this.categories = data;
    });

    // this.booksDataService.getBooks();
    // this.booksDataService.getBooksUpdateListener().subscribe((data) => {
    // this.books = data;
    // });
    // if (this.books === undefined || this.books.length <= 0) {
    //   this.books = this.booksjson;
    // }

    // this.BookComponent.getStatus()
  }

  borrowedByMe(bookId) {
    this.userEmail = this.authService.getUserId();

    if (!this.isAuthenticated) {
      return false;
    }
    for (let i = 1; i < this.borrows.length; i++) {
      if (
        this.borrows[i].user_id == this.userEmail &&
        bookId == this.borrows[i].book_id &&
        this.borrows[i].return_date == null
      ) {
        return true;
      }
    }
    return false;
  }

  ngOnDestroy() {
    this.authStatusSub.unsubscribe();
  }

  scroll(): void {
    var search = document.getElementById('search');
    var tags = document.getElementById('tags');
    var contain = search.classList.contains('searchOpacity');
    if (contain) {
      this.isCloseTrue = false;
      search.classList.remove('searchOpacity');
      // tags.classList.remove('catEvents');
    } else {
      this.isCloseTrue = true;
      search.classList.add('searchOpacity');
      // tags.classList.add('catEvents');
      // document.getElementById('tags').style.height = '75px';
      document.getElementById('search').focus();
    }
  }

  UNtoggle() {
    document.getElementById('curtain').style.opacity = '0';
    document.getElementById('curtain').style.zIndex = '-100';
    document.getElementById('popup').style.opacity = '0';
    document.getElementById('popup').style.zIndex = '-2';
    document.getElementById('popup').style.width = '0vw';
    document.getElementById('popup').style.height = '0vh';
  }

  clear() {
    this.searchText = '';
  }

  onClearCategories() {
    this.checkboxes.forEach((element) => {
      element.nativeElement.checked = false;
    });
    this.selected = [];
    this.booksService.getBooksWithData().subscribe((documents) => {
      this.books = documents.books;
    });
  }
}
