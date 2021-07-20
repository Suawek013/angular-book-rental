import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'borrow-list-panel-header',
  templateUrl: './borrow-list-header.component.html',
  styleUrls: ['./borrow-list-header.component.css']
})
export class BorrowListHeaderComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }
  toggleMenu() {
    var menu = document.querySelector('.nav-bar');
    menu.classList.toggle('responsive');
    // document.addEventListener('click', () => {
    //   menu.className = 'nav-bar';
    // });
  }
}
