import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Borrow } from './borrow.model';
import { MatSnackBar } from '@angular/material/snack-bar';

import { environment } from '../../environments/environment';

const apiUrl = environment.apiUrl;

@Injectable({ providedIn: 'root' })
export class BorrowService {
  constructor(private http: HttpClient, readonly snackBar: MatSnackBar) { }

  private borrows: Borrow[] = [];
  private borrowsUpdated = new Subject<Borrow[]>();
  private userBorrows: Borrow[] = [];
  private userBorrowsUpdated = new Subject<Borrow[]>();

  getBorrowStatus(userId, bookId) {
    const token = localStorage.getItem('token');
    const tokenData = { token: token };
    return this.http.post<{
      message: string;
      isBorrowed: boolean;
      userIsDifferent: boolean;
      borrow: any;
    }>(apiUrl + '/api/borrow/' + userId + '/' + bookId, tokenData);
  }

  getBorrowsUpdatedListener() {
    return this.borrowsUpdated.asObservable();
  }

  getUserBorrowsUpdatedListener() {
    return this.userBorrowsUpdated.asObservable();
  }

  getBorrows() {
    const token = localStorage.getItem('token');
    const tokenData = { token: token };
    this.http
      .post<{ message: string; borrows: any }>(apiUrl + '/api/borrow', tokenData)
      .subscribe((data) => {
        this.borrows = data.borrows;
        this.borrowsUpdated.next([...this.borrows]);
      });
  }

  getUserBorrows(userId: string) {
    const token = localStorage.getItem('token');
    const tokenData = { token: token };
    this.http
      .post<{ message: string; borrows: any }>(apiUrl + '/api/borrow/' + userId, tokenData)
      .subscribe((data) => {
        this.userBorrows = data.borrows;
        this.userBorrowsUpdated.next([...this.userBorrows]);
      });
  }

  borrowBook(userId, bookId, date) {
    this.snackBar.open('Wypożyczono książkę', '', { horizontalPosition: 'start', duration: 4000, panelClass: ['snackBar'] });
    const token = localStorage.getItem('token');
    const borrow = {
      token: token,
      id: null,
      user_id: userId,
      book_id: bookId,
      borrow_date: date,
      return_date: null,
    };
    return this.http.post<{ borrow: string }>(apiUrl + '/api/borrow', borrow);
  }

  returnBook(userId, bookId, date) {
    this.snackBar.open('Oddano książkę', '', { horizontalPosition: 'start', duration: 4000, panelClass: ['snackBar'] });
    return this.http.put<{ message: string }>(apiUrl + '/api/borrow', {
      userId,
      bookId,
      date,
    });
  }
}
