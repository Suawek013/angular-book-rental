import { Component, OnDestroy, OnInit } from "@angular/core";
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.css"]
})
export class LoginComponent implements OnInit, OnDestroy {
  private authStatusSub: Subscription;
  errorMessage = null;

  private errorMessageListener: Subscription;

  constructor(public authService: AuthService) { }

  ngOnInit(): void {
    let screenWH = screen.width;
    if (screenWH <= 768) {
      document.getElementById("login-box").classList.add('mobile');
    }
    this.authStatusSub = this.authService.getAuthStatusLisener().subscribe();
    this.errorMessageListener = this.authService.getErrorMessageListener().subscribe();
  }

  onLogin(form: NgForm) {
    if (form.invalid) {
      return;
    }
    this.authService.login(form.value.email.toLowerCase(), form.value.password);
    this.errorMessage = this.authService.getErrorMessage();
    this.errorMessageListener = this.authService
      .getErrorMessageListener()
      .subscribe(errorMessage => {
        this.errorMessage = errorMessage;
      });
  }

  ngOnDestroy() {
    this.authStatusSub.unsubscribe();
    this.errorMessageListener.unsubscribe();
  }
}
