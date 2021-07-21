import { Component, OnDestroy, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';
import { Borrow } from 'src/app/borrow/borrow.model';
import { BorrowService } from 'src/app/borrow/borrow.service';

import { AuthData } from '../auth-data.model';
import { AuthService } from '../auth.service';
import { DomainService } from "../domain.service";

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})

export class UserListComponent implements OnInit, OnDestroy {
  users: AuthData[] = [];
  borrows: Borrow[] = [];
  isLoading = false;
  searchText = '';
  isTableMode: boolean = false;
  isEditMode: boolean = false;
  filter1 = null;
  filter2 = 'verified';
  filter3 = 'canAddBooks';
  filter4 = 'admin';
  isConfigMode: boolean = false;
  private userSub: Subscription;
  private borrowsSub: Subscription;
  private canEdit = false;

  constructor(public authService: AuthService, public domainService: DomainService, public borrowService: BorrowService) { }

  onBlock(userId, email, passwd, fn, ls, userPermission) {
    // this.authService.deleteUser(userId);
    userPermission = 'blocked';
    this.authService.updateUser(userId, email, passwd, fn, ls, userPermission);
  }

  onEdit(userId, email, passwd, fn, ls, form: NgForm) {
    // if(form.invalid) {
    //   return;
    // }
    if (this.canEdit) {
      console.log(form.value);
      this.authService.updateUser(userId, email, passwd, fn, ls, form.value.permission);
    }
    else {
      return;
    }
    form.resetForm();
  }

  changeFilter(permission) {
    this.filter1 = permission;
    this.filter2 = '';
    this.filter3 = '';
    this.filter4 = '';
  }

  changeFilterToAll() {
    this.filter1 = null;
    this.filter2 = 'verified';
    this.filter3 = 'canAddBooks';
    this.filter4 = 'admin';
  }

  onChangeMode() {
    this.isEditMode = !this.isEditMode;
  }

  verifyUser(userId, email, passwd, fn, ls, userPermission) {
    userPermission = 'verified';
    this.authService.updateUser(userId, email, passwd, fn, ls, userPermission);
    this.authService.sendEmail(userId, email, passwd, fn, ls, userPermission);
  }

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

  // wersja boolean

  // checkIfUserHaveBook(bookId) {
  //   console.log(userId);
  //   for (let i = 1; i < this.borrows.length; i++) {
  //     if (this.borrows[i].return_date == null) {
  //       return true;
  //     }
  //   }
  //   return false;
  // }



  //wersja z ilością książek

  checkIfUserHaveBook(userId) {
    let books = null;
    for (let i = 1; i < this.borrows.length; i++) {
      if (this.borrows[i].user_id == userId && this.borrows[i].return_date == null) {
        books++;
      }
    }
    if (books == 1) {
      return `Wypożycza ${books} książkę`;
    } else if (books > 1 && books < 5) {
      return `Wypożycza ${books} książki`;
    } else if (books > 4) {
      return `Wypożycza ${books} książek`
    }
  }



  ngOnInit() {
    this.isLoading = true;
    this.authService.getUsers();
    this.canEdit = true;
    this.userSub = this.authService.getUsersUpdateListener()
      .subscribe((users: AuthData[]) => {
        this.isLoading = false;
        this.users = users;
      });
    this.borrowService.getBorrows();
    this.borrowsSub = this.borrowService.getBorrowsUpdatedListener().subscribe((borrows: Borrow[]) => {
      this.isLoading = false;
      this.borrows = borrows;
    });


  }

  ngOnDestroy() {
    this.userSub.unsubscribe();
  }
}
