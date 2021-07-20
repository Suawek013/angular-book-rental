import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AngularMaterialModule } from '../angular-material.module';
import { BackButtonComponent } from './back-button/back-button.component';
import { FilterPipe } from './filter.pipe';
import { MenuBarComponent } from './menu-bar/menu-bar.component';

@NgModule({
  declarations: [BackButtonComponent, FilterPipe, MenuBarComponent],
  imports: [CommonModule, AngularMaterialModule, RouterModule],
  exports: [BackButtonComponent, CommonModule, FilterPipe, MenuBarComponent],
})
export class SharedModule {}
