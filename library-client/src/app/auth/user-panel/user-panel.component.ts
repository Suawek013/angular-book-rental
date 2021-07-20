import { Component, OnDestroy, OnInit } from "@angular/core";
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';
import { AuthData } from '../auth-data.model';
import { AuthService } from '../auth.service';


@Component({
  selector: 'app-user-panel',
  templateUrl: './user-panel.component.html',
  styleUrls: ['./user-panel.component.css']
})

export class UserPanelComponent implements OnInit, OnDestroy {
  user: AuthData;
  userId = '';
  input1 = '';
  input2 = '';
  isUserDataEditMode: boolean = false;
  isPasswordEditMode: boolean = false;
  errorMessage = null;
  private errorMessageListener: Subscription;
  private userSub: Subscription;
  private userIdListener: Subscription;
  showPasswordChangeInput = false;

  constructor(private authService: AuthService) { }

  onUserDataChangeMode() {
    this.isUserDataEditMode = !this.isUserDataEditMode;
  }

  onPasswordChangeMode() {
    this.isPasswordEditMode = !this.isPasswordEditMode;
  }

  onEdit(userId, email, passwd, permission, form: NgForm) {
    if (form.invalid) {
      return;
    }
    if (this.isUserDataEditMode) {
      console.log(form.value);
      this.authService.updateUser(userId, email, passwd, form.value.firstName, form.value.lastName, permission);
    }
    else {
      return;
    }
  }

  onPasswordChange(userId, email, fn, ln, permission, form: NgForm, checkPassword) {
    if (form.invalid) {
      return;
    }
    if (this.isPasswordEditMode) {
      if (form.value.password == checkPassword.value) {
        this.authService.updateUser(userId, email, form.value.password, fn, ln, permission);
        this.errorMessage = this.authService.getErrorMessage();
        this.errorMessageListener = this.authService
          .getErrorMessageListener()
          .subscribe(errorMessage => {
            this.errorMessage = errorMessage;
          });
      } else {
        this.errorMessage = 'Podane hasła różnią się od siebie';
      }
    }
    else {
      return;
    }
    form.resetForm();
  }

  // onDelete() {
  //   this.authService.deleteUser(this.userId);
  // }

  onInput1Change(value) {
    this.input1 = value;
  }

  onInput2Change(value) {
    this.input2 = value;
    this.errorCheck();
  }

  errorCheck() {
    if (this.input1 != this.input2) {
      return true;
    } else {
      return false;
    }
  }


  ngOnInit() {
    this.userId = this.authService.getUserId();
    this.userIdListener = this.authService
      .getUserIdListener()
      .subscribe(userId => {
        this.userId = userId;
      })

    this.authService.getUserById(this.userId)
      .subscribe((response) => {
        this.user = response.document;
      });
  }

  ngOnDestroy() {
    this.userIdListener.unsubscribe();
  }
}
