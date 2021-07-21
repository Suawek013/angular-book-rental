import { Component, OnDestroy, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';
import { CommonModule } from '@angular/common';

import { AuthData } from '../auth/auth-data.model';
import { AuthService } from '../auth/auth.service';
import { DomainService } from "../auth/domain.service";
import { BooksService } from '../books.service';
import { Book_data } from '../book_data.model';
import { Borrow } from './borrow.model';
import { BorrowService } from './borrow.service';

@Component({
  selector: 'app-borrow-list',
  templateUrl: './borrow-list.component.html',
  styleUrls: ['./borrow-list.component.css']
})

export class BorrowListComponent implements OnInit, OnDestroy {



  users: AuthData[] = [];
  isLoading = false;
  searchText = '';
  isEditMode: boolean = false;
  filter1 = null;
  filter2 = 'verified';
  filter3 = 'canAddBooks';
  filter4 = 'admin';
  userId;
  isConfigMode: boolean = false;
  borrows: Borrow[] = [];
  // borrows: [{ Borrow: Borrow; Book_data: Book_data[] }];
  private borrowsSub: Subscription;

  displayedColumns: string[] = ['title', 'borrow_date', 'return_date'];

  constructor(public borrowService: BorrowService, public authService: AuthService, public domainService: DomainService, private booksService: BooksService) { }



  toggle() {
    if (screen.width <= 768) {
      document.getElementById('popup').style.opacity = '1';
      document.getElementById('popup').style.zIndex = '60';
      document.getElementById('popup').style.width = '100%';
      document.getElementById('popup').style.height = '100%';
      document.getElementById('popup').classList.add('mobilePopup');
    } else {
      document.getElementById('curtain').style.opacity = '0.3';
      document.getElementById('curtain').style.zIndex = '3';
      document.getElementById('popup').style.opacity = '1';
      document.getElementById('popup').style.zIndex = '3';
      document.getElementById('popup').style.width = '400px';
      document.getElementById('popup').style.height = '300px';
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



  returnBook(userId, bookId) {
    document.querySelector('button').disabled = true;
    var date = new Date().toLocaleString();
    this.borrowService.returnBook(userId, bookId, date).subscribe((response) => {
    })
    window.location.reload(true);
  }

  ngOnInit() {
    this.isLoading = true;
    this.userId = this.authService.getUserId();

    // this.borrowService.getBorrows();
    // this.borrowsSub = this.borrowService.getBorrowsUpdatedListener().subscribe((borrows: Borrow[]) => {
    //   this.isLoading = false;
    //   this.borrows = borrows;
    //   console.log(this.borrows);
    // });

    this.borrowService.getUserBorrows(this.userId);
    this.borrowsSub = this.borrowService.getUserBorrowsUpdatedListener().subscribe((borrows: Borrow[]) => {
      this.isLoading = false;
      this.borrows = borrows;
    });

  }

  ngOnDestroy() {
    this.borrowsSub.unsubscribe();
  }
}
