import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-menu-bar',
  templateUrl: './menu-bar.component.html',
  styleUrls: ['./menu-bar.component.css'],
})
export class MenuBarComponent implements OnInit {
  constructor() {}
  ngOnInit(): void {}

  toggleMenu() {
    var menu = document.querySelector('.nav-bar');
    menu.classList.toggle('responsive');
    // document.addEventListener('click', () => {
    //   menu.className = 'nav-bar';
    // });
  }
}
