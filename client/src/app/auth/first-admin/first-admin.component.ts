import { Component, OnDestroy, OnInit } from "@angular/core";
import { NgForm } from "@angular/forms";
// import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';
import { AuthService } from '../auth.service';
import { DomainService } from "../domain.service";

@Component({
  selector: 'app-first-admin',
  templateUrl: "./first-admin.component.html",
  styleUrls: ["./first-admin.component.css"]
})
export class firstAdminComponent implements OnInit, OnDestroy {
  private authStatusSub: Subscription;
  userId = '';
  input1 = '';
  input2 = '';
  domain;
  errorMessage = null;

  private errorMessageListener: Subscription;
  private userIdListener: Subscription;

  constructor(public authService: AuthService, public domainService: DomainService) { }

  ngOnInit(): void {
    let screenWH = screen.width;
    if (screenWH <= 768) {
      document.getElementById("login-box2").classList.add('mobile');
    }
    this.authStatusSub = this.authService.getAuthStatusLisener().subscribe();
    this.errorMessageListener = this.authService.getErrorMessageListener().subscribe();
    this.authService.getUsers();
    this.userId = this.authService.getUserId();
    this.userIdListener = this.authService
      .getUserIdListener()
      .subscribe(userId => {
        this.userId = userId;
      })

    this.domainService.getConfig();
    this.domain = this.domainService.getDomainName();
    this.domainService.getDomainListener().subscribe(data => {
      this.domain = data;
    });
  }

  onEdit(userId, form: NgForm) {
    this.authService.updateUser(userId, form.value.email, form.value.password, form.value.firstName, form.value.lastName, 'admin');
  }

  // onSignup(form: NgForm) {
  //   if (form.invalid) {
  //     return;
  //   }
  //   if (form.value.password != form.value.checkPassword) {
  //     this.errorMessage = 'Podane hasła różnią się od siebie';
  //   } else {
  //     this.authService.createUser(form.value.email, form.value.password, form.value.firstName, form.value.lastName);
  //     this.errorMessage = this.authService.getErrorMessage();
  //     this.errorMessageListener = this.authService
  //       .getErrorMessageListener()
  //       .subscribe(errorMessage => {
  //         this.errorMessage = errorMessage;
  //       });
  //   }
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

  ngOnDestroy() {
    this.authStatusSub.unsubscribe();
    this.errorMessageListener.unsubscribe();
    this.userIdListener.unsubscribe();
  }
}
