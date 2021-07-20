import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService } from '../auth/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  firstName = '';
  lastName = '';
  userPermission = '';
  userEmail = '';

  private authListenerSubs: Subscription;
  private getUserFirstNameListener: Subscription;
  private getUserLastNameListener: Subscription;
  private getUserPermissionListener: Subscription;
  private getUserEmailListener: Subscription;

  userIsAuthenticated = false;

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit(): void {
    this.userIsAuthenticated = this.authService.getIsAuth();
    this.authListenerSubs = this.authService
      .getAuthStatusLisener()
      .subscribe((isAuthenticated) => {
        this.userIsAuthenticated = isAuthenticated;
        if (this.userIsAuthenticated) {
          this.UNtoggle();
        }
      });

    this.firstName = this.authService.getUserFirstName();
    this.getUserFirstNameListener = this.authService
      .getUserFirstNameListener()
      .subscribe((firstName) => {
        this.firstName = firstName;
      });

    this.lastName = this.authService.getUserLastName();
    this.getUserLastNameListener = this.authService
      .getUserLastNameListener()
      .subscribe((lastName) => {
        this.lastName = lastName;
      });

    this.userPermission = this.authService.getUserPermission();
    this.getUserPermissionListener = this.authService
      .getUserPermissionListener()
      .subscribe((userPermission) => {
        this.userPermission = userPermission;
      });

    this.userEmail = this.authService.getUserEmail();
    this.getUserEmailListener = this.authService
      .getUserEmailListener()
      .subscribe((email) => {
        this.userEmail = email;
      });
  }

  scroll($element): void {
    console.log($element);
    $element.scrollIntoView({ behavior: "smooth", block: "start", inline: "nearest" });
  }

  num = 2;
  showAcc() {
    if (this.num % 2 != 0) {
      document.getElementById('closeAcc').style.zIndex = '-100';
      document.getElementById('closeAcc').style.height = '1px';
      document.getElementById('closeAcc').style.width = '1px';
      document.getElementById('accountManager').style.fontSize = '0px';
      document.getElementById('accInf').style.height = '0px';
      document.getElementById('accInf').style.paddingTop = '0px';
      document.getElementById('accInf').style.border = '0px';
      this.num++;
    } else {
      document.getElementById('closeAcc').style.zIndex = '1';
      document.getElementById('closeAcc').style.height = '200vh';
      document.getElementById('closeAcc').style.width = '200vw';
      document.getElementById('accountManager').style.fontSize = '12px';
      switch (this.userPermission) {
        case 'admin':
          document.getElementById('accInf').style.height = '275px';
          break;
        case 'canAddBooks':
          document.getElementById('accInf').style.height = '225px';
          break;
        case 'verified':
          document.getElementById('accInf').style.height = '175px';
          break;
        default:
          document.getElementById('accInf').style.height = '125px';
      }
      document.getElementById('accInf').style.paddingTop = '7px';
      document.getElementById('accInf').style.borderLeft = '0.7px solid black';
      document.getElementById('accInf').style.borderBottom =
        '0.7px solid black';
      this.num++;
    }
  }

  closeAcc() {
    document.getElementById('closeAcc').style.zIndex = '-100';
    document.getElementById('closeAcc').style.height = '1px';
    document.getElementById('closeAcc').style.width = '1px';
    document.getElementById('accountManager').style.fontSize = '0px';
    document.getElementById('accInf').style.height = '0px';
    document.getElementById('accInf').style.paddingTop = '0px';
    document.getElementById('accInf').style.border = '0px';
    this.num++;
  }

  onClick(): void {
    this.userIsAuthenticated ? this.showAcc() : this.toggle();
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

  onLogout() {
    this.authService.logout();
    this.showAcc();
  }

  isHomeRoute() {
    return this.router.url === '/';
  }

}

