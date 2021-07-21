import { Component, OnDestroy, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';
import { CommonModule } from '@angular/common';

import { AuthData } from '../../auth-data.model';
import { BooksService } from 'src/app/books.service';
import { Borrow } from 'src/app/borrow/borrow.model';
import { BorrowService } from 'src/app/borrow/borrow.service';
import { AuthService } from '../../auth.service';
import { DomainService } from '../../domain.service';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';

@Component({
  selector: 'user-borrow-table',
  templateUrl: './user-borrow-table.component.html',
  styleUrls: ['./user-borrow-table.component.css']
})

export class UserBorrowTableComponent implements OnInit, OnDestroy {



  users: AuthData[] = [];
  isLoading = false;
  searchText = '';
  isEditMode: boolean = false;
  filter1 = null;
  filter2 = 'verified';
  filter3 = 'canAddBooks';
  filter4 = 'admin';
  private userId: string;
  isConfigMode: boolean = false;
  borrows: Borrow[] = [];
  // borrows: [{ Borrow: Borrow; Book_data: Book_data[] }];
  private borrowsSub: Subscription;

  displayedColumns: string[] = ['title', 'borrow_date', 'return_date'];

  constructor(private route: ActivatedRoute, public borrowService: BorrowService, public authService: AuthService, public domainService: DomainService, private booksService: BooksService) { }



  returnBook(userId, bookId) {
    document.querySelector('button').disabled = true;
    var date = new Date().toLocaleString();
    this.borrowService.returnBook(userId, bookId, date).subscribe((response) => {
    })
    window.location.reload(true);
  }

  ngOnInit() {
    this.isLoading = true;

    this.route.paramMap.subscribe((paramMap: ParamMap) => {
      if (paramMap.has('id')) {
        console.log("paramMap works");
        this.userId = paramMap.get('id');
        this.borrowService.getUserBorrows(this.userId);
        this.borrowsSub = this.borrowService.getUserBorrowsUpdatedListener().subscribe((borrows: Borrow[]) => {
          this.isLoading = false;
          this.borrows = borrows;
        });
      }
    })
  }

  ngOnDestroy() {
    this.borrowsSub.unsubscribe();
  }
}
