import { Component } from '@angular/core';

@Component({
  selector: 'back-button',
  template: `<div class="back" onclick="activate()" onclick="header()">
    <a mat-raised-button routerLink="" color="primary" class="back">Powrót</a>
  </div>`,
  styleUrls: ['./back-button.component.css'],
})
export class BackButtonComponent {}
