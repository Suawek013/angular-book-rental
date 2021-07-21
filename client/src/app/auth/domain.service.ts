import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Configuration } from './configuration.model';
import { environment } from '../../environments/environment';
import { MatSnackBar } from '@angular/material/snack-bar';

const apiUrl = environment.apiUrl;

@Injectable({
  providedIn: 'root',
})
export class DomainService {
  private Domain;
  private host;
  private port;
  private secure;
  private domainListener = new Subject<string>();
  private hostListener = new Subject<string>();
  private portListener = new Subject<string>();
  private secureListener = new Subject<string>();

  constructor(private http: HttpClient, readonly snackBar: MatSnackBar) { }

  getDomainName() {
    return this.Domain;
  }

  getDomainListener() {
    return this.domainListener.asObservable();
  }

  getHostName() {
    return this.host;
  }

  getHostListener() {
    return this.hostListener.asObservable();
  }

  getPortName() {
    return this.port;
  }

  getPortListener() {
    return this.portListener.asObservable();
  }

  getSecureName() {
    return this.secure;
  }

  getSecureListener() {
    return this.secureListener.asObservable();
  }

  getConfig() {
    const tokenData = { token: localStorage.getItem('token') };
    this.http
      .post<{ Configuration: Configuration }>(
        apiUrl + '/api/configuration/' + '0',
        tokenData
      )
      .subscribe((data) => {
        this.Domain = data.Configuration.domain;
        this.domainListener.next(data.Configuration.domain);

        this.host = data.Configuration.host;
        this.hostListener.next(data.Configuration.host);

        this.port = data.Configuration.port;
        this.portListener.next(data.Configuration.port);

        this.secure = data.Configuration.secure;
        this.secureListener.next(data.Configuration.secure);
      });
  }

  updateConfig(
    id: string,
    domain: string,
    host: string,
    port: string,
    secure: string
  ) {
    const configuration: Configuration = {
      id,
      domain,
      host,
      port,
      secure,
    };
    this.http
      .put(apiUrl + '/api/configuration/' + '0', configuration)
      .subscribe((responseData) => {
        this.snackBar.open('Zaktualizowano domenę', '', { horizontalPosition: 'start', duration: 4000, panelClass: ['snackBar'] });
        // const updatedBooks = [...this.books];
        // const oldBookIndex = updatedBooks.findIndex((p) => p.id === book.id);
        // updatedBooks[oldBookIndex] = book;
        // this.books.push(book);
        // this.booksUpdated.next([...this.books]);
      });
  }
}
