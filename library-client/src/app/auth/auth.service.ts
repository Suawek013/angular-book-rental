import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { AuthData } from './auth-data.model';
import { Subject } from 'rxjs';
import { nullSafeIsEquivalent } from '@angular/compiler/src/output/output_ast';
import { environment } from '../../environments/environment';
import { MatSnackBar } from '@angular/material/snack-bar';

const apiUrl = environment.apiUrl;

@Injectable({ providedIn: 'root' })
export class AuthService {
  private isAuthenticated = false;
  private token: string;
  private tokenTimer: any;
  private authStatusListener = new Subject<boolean>();
  private userId;
  private userIdListener = new Subject<string>();
  private userPermission;
  private userPermissionListener = new Subject<string>();
  private firstName;
  private firstNameListener = new Subject<string>();
  private lastName;
  private lastNameListener = new Subject<string>();
  private email;
  private emailListener = new Subject<string>();
  private errorMessage: any;
  private errorMessageListener = new Subject<boolean>();

  private users: AuthData[] = [];
  private usersUpdated = new Subject<AuthData[]>();

  constructor(private http: HttpClient, private router: Router, readonly snackBar: MatSnackBar) { }

  getToken() {
    return this.token;
  }

  getIsAuth() {
    return this.isAuthenticated;
  }

  getAuthStatusLisener() {
    return this.authStatusListener.asObservable();
  }

  getUsersUpdateListener() {
    return this.usersUpdated.asObservable();
  }

  //get logged user data

  getUserPermission() {
    return this.userPermission;
  }

  getUserPermissionListener() {
    return this.userPermissionListener.asObservable();
  }

  getUserId() {
    return this.userId;
  }

  getUserIdListener() {
    return this.userIdListener.asObservable();
  }

  getUserFirstName() {
    return this.firstName;
  }

  getUserFirstNameListener() {
    return this.firstNameListener.asObservable();
  }

  getUserLastName() {
    return this.lastName;
  }

  getUserLastNameListener() {
    return this.lastNameListener.asObservable();
  }

  getUserEmail() {
    return this.email;
  }

  getUserEmailListener() {
    return this.emailListener.asObservable();
  }

  getErrorMessage() {
    return this.errorMessage;
  }

  getErrorMessageListener() {
    return this.errorMessageListener.asObservable();
  }

  createUser(
    email: string,
    password: string,
    firstName: string,
    lastName: string
  ) {
    const authData: AuthData = {
      id: null,
      email: email,
      password: password,
      firstName: firstName,
      lastName: lastName,
      permission: null,
    };
    this.http
      .post<{ userId: string }>(apiUrl + '/api/user/signup', authData)
      .subscribe(
        (response) => {
          authData.id = response.userId;
          this.users.push(authData);
          this.usersUpdated.next([...this.users]);
          this.router.navigate(['/']);
          this.login(email, password);
        },
        (error) => {
          this.authStatusListener.next(false);
          this.errorMessage = 'Ten adres e-mail jest już zajęty';
          this.errorMessageListener.next(this.errorMessage);
        }
      );
  }

  login(email: string, password: string) {
    const authData = { email: email, password: password };
    this.http
      .post<{ token: string; expiresIn: number; fetchedUser }>(
        apiUrl + '/api/user/login',
        authData
      )
      .subscribe(
        (response) => {
          const token = response.token;
          this.token = token;
          if (response.fetchedUser.permission == 'blocked') {
            this.authStatusListener.next(false);
            this.errorMessage =
              'Twoje konto zostało zablokowane przez administratora';
            this.errorMessageListener.next(this.errorMessage);
          } else if (token) {
            this.snackBar.open('Zalogowano', '', { horizontalPosition: 'start', duration: 4000, panelClass: ['snackBar'] });
            const expiresInDuration = response.expiresIn;
            this.setAuthTimer(expiresInDuration);
            this.isAuthenticated = true;
            localStorage.setItem('token', token);
            this.authStatusListener.next(true);
            const now = new Date();
            const expirationDate = new Date(
              now.getTime() + expiresInDuration * 1000
            );
            // console.log(expirationDate);
            this.users.push(response.fetchedUser);
            this.usersUpdated.next([...this.users]);
            this.userId = response.fetchedUser.id;
            this.userPermission = response.fetchedUser.permission;
            this.userPermissionListener.next(response.fetchedUser.permission);
            this.firstName = response.fetchedUser.firstName;
            this.firstNameListener.next(response.fetchedUser.firstName);
            this.lastName = response.fetchedUser.lastName;
            this.lastNameListener.next(response.fetchedUser.lastName);
            console.log(response.fetchedUser);
            this.email = response.fetchedUser.email;
            this.emailListener.next(response.fetchedUser.email);
            this.errorMessage = '';
            this.errorMessageListener.next(this.errorMessage);
            this.saveAuthData(
              response.fetchedUser.id,
              token,
              expirationDate,
              response.fetchedUser.firstName,
              response.fetchedUser.lastName,
              response.fetchedUser.permission,
              response.fetchedUser.email
            );
          }
        },
        (error) => {
          this.authStatusListener.next(false);
          this.errorMessage = 'Wprowadzono nieprawidłowe dane do logowania';
          this.errorMessageListener.next(this.errorMessage);
        }
      );
  }

  getUsers() {
    const token = localStorage.getItem('token');
    const tokenData = { token: token };
    this.http
      .post<{ message: string; users: any }>(
        apiUrl + '/api/user',
        tokenData
      )
      .subscribe((data) => {
        this.users = data.users;
        this.usersUpdated.next([...this.users]);
      });
  }

  getUserById(userId: string) {
    const token = localStorage.getItem('token');
    const tokenData = { token: token };
    return this.http.post<{ message: string; document: AuthData }>(
      apiUrl + '/api/user/' + userId,
      tokenData
    )
  }

  autoAuthUser() {
    const authInformation = this.getAuthData();
    if (!authInformation) {
      return;
    }
    const now = new Date();
    const expiresIn = authInformation.expirationDate.getTime() - now.getTime();
    // console.log(authInformation, expiresIn);
    if (expiresIn > 0) {
      this.token = authInformation.token;
      this.isAuthenticated = true;
      this.userId = authInformation.userId;
      this.firstName = authInformation.firstName;
      this.lastName = authInformation.lastName;
      this.userPermission = authInformation.userPermission;
      this.email = authInformation.email;
      this.setAuthTimer(expiresIn / 1000);
      this.authStatusListener.next(true);
    }
  }

  logout() {
    this.snackBar.open('Wylogowano', '', { horizontalPosition: 'start', duration: 4000, panelClass: ['snackBar'] });
    this.token = null;
    this.isAuthenticated = false;
    this.authStatusListener.next(false);
    clearTimeout(this.tokenTimer);
    this.clearAuthData();
    this.userId = null;
    this.userIdListener.next(null);
    this.firstName = null;
    this.firstNameListener.next(null);
    this.lastName = null;
    this.lastNameListener.next(null);
    this.email = null;
    this.emailListener.next(null);
    // if (this.router.url.includes('/book')) {
    //   this.router.navigate(['/']);
    // }
  }

  private setAuthTimer(duration: number) {
    // console.log("Setting timer " + duration)
    this.tokenTimer = setTimeout(() => {
      this.logout();
    }, duration * 1000);
  }

  private saveAuthData(
    userId: string,
    token: string,
    expirationDate: Date,
    firstName: string,
    lastName: string,
    userPermission: string,
    email: string
  ) {
    localStorage.setItem('userId', userId);
    localStorage.setItem('token', token);
    localStorage.setItem('expiration', expirationDate.toISOString());
    localStorage.setItem('firstName', firstName);
    localStorage.setItem('lastName', lastName);
    localStorage.setItem('userPermission', userPermission);
    localStorage.setItem('email', email);
  }

  private clearAuthData() {
    localStorage.removeItem('userId');
    localStorage.removeItem('token');
    localStorage.removeItem('expiration');
    localStorage.removeItem('firstName');
    localStorage.removeItem('lastName');
    localStorage.removeItem('userPermission');
    localStorage.removeItem('email');
  }

  private getAuthData() {
    const userId = localStorage.getItem('userId');
    const token = localStorage.getItem('token');
    const expirationDate = localStorage.getItem('expiration');
    const firstName = localStorage.getItem('firstName');
    const lastName = localStorage.getItem('lastName');
    const userPermission = localStorage.getItem('userPermission');
    const email = localStorage.getItem('email');
    if (!token || !expirationDate) {
      return;
    }
    return {
      userId: userId,
      token: token,
      expirationDate: new Date(expirationDate),
      firstName: firstName,
      lastName: lastName,
      userPermission: userPermission,
      email: email,
    };
  }

  deleteUser(id: string) {
    this.http
      .delete<{ message: string }>(apiUrl + '/api/user/' + id)
      .subscribe(() => {
        const updatedUsers = this.users.filter((user) => user.id !== id);
        this.users = updatedUsers;
        this.usersUpdated.next([...this.users]);
      });
  }

  updateUser(
    id: string,
    email: string,
    password: string,
    firstName: string,
    lastName: string,
    permission: string
  ) {
    const user: AuthData = {
      id,
      email,
      password,
      firstName,
      lastName,
      permission,
    };
    this.http
      .put<{ errorMessage: string }>(apiUrl + '/api/user/' + id, user)
      .subscribe((responseData) => {
        this.snackBar.open('Zaktualizowano dane użytkownika', '', { horizontalPosition: 'start', duration: 4000, panelClass: ['snackBar'] });
        this.errorMessage = responseData.errorMessage;
        this.errorMessageListener.next(this.errorMessage);
        const updatedUsers = [...this.users];
        const oldUsersIndex = updatedUsers.findIndex((p) => p.id === user.id);
        updatedUsers[oldUsersIndex] = user;
        // this.users.push(user);
        this.usersUpdated.next([...this.users]);
        if (this.email == email) {
          this.firstName = firstName;
          this.firstNameListener.next(firstName);
          this.lastName = lastName;
          this.lastNameListener.next(lastName);
          localStorage.setItem('firstName', firstName);
          localStorage.setItem('lastName', lastName);
        }
      });
  }
  sendEmail(
    id: string,
    email: string,
    password: string,
    firstName: string,
    lastName: string,
    permission: string
  ) {
    const user: AuthData = {
      id,
      email,
      password,
      firstName,
      lastName,
      permission,
    };
    console.log(user);
    this.http.post(apiUrl + '/api/mail', user).subscribe((responseData) => {
      console.log(responseData);
    });
  }
}
