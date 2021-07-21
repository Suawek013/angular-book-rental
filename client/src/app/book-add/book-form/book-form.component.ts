import { Component, Input, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { map } from 'rxjs/operators';
import { MatSnackBar } from '@angular/material/snack-bar';

import { Book_data } from 'src/app/book_data.model';
import { BooksByCategoryService } from 'src/app/books-by-category.service';
import { CategoriesService } from 'src/app/categories.service';
import { Category } from 'src/app/category.model';
import { BooksDataService } from '../../books-data.service';
import { BooksService } from 'src/app/books.service';
import { Book } from 'src/app/book.model';

@Component({
  selector: 'app-book-form',
  templateUrl: './book-form.component.html',
  styleUrls: ['./book-form.component.css', '../book-add.component.css'],
})
export class BookFormComponent implements OnInit {
  book: Book_data;
  canEdit = false;
  private bookId: string;
  imageError = false;
  imgPlaceholder = 'assets/Images/image-not-found.jpg';
  bookCopies: Book[] = [];
  minDate: Date;
  maxDate: Date;

  @Input() quantity = 1;
  categories: Category[] = [];
  categoryList: Category[] = [];
  editCategories = ['none was assigned'];

  constructor(
    private booksDataService: BooksDataService,
    private route: ActivatedRoute,
    private categoriesService: CategoriesService,
    private booksByCatServ: BooksByCategoryService,
    private router: Router,
    private booksService: BooksService,
    readonly snackBar: MatSnackBar
  ) {
    //Set min & max on date picker
    this.minDate = new Date(1970, 0, 1);
    this.maxDate = new Date();
  }

  onSaveBook(form: NgForm) {
    if (form.invalid) {
      return;
    }
    if (this.canEdit) {
      this.booksDataService.updateBook(
        this.bookId,
        form.value.title,
        form.value.description,
        form.value.publication_date,
        form.value.author,
        form.value.publisher,
        form.value.image,
        form.value.isbn
      );
      this.booksByCatServ.deleteBooksByCategories(this.bookId).subscribe(() => {
        if (form.value.selectedCategories) {
          form.value.selectedCategories.forEach((category) => {
            this.booksByCatServ.updateBookCategories(this.bookId, category.id);
          });
        }
        this.editCategories = [];
        form.resetForm();
        this.router.navigate(['book-add/book-list']);
      });
    } else {
      this.booksDataService
        .addBook(
          form.value.title,
          form.value.description,
          form.value.publication_date,
          form.value.author,
          form.value.publisher,
          form.value.image,
          form.value.isbn
        )
        .subscribe((responseData) => {
          if (typeof responseData.bookId == 'undefined') {
            this.snackBar.open(responseData.message, '', {
              horizontalPosition: 'start',
              duration: 4000,
              panelClass: ['snackBar'],
            });
            // window.alert(responseData.message);
            return;
          }
          if (form.value.selectedCategories) {
            form.value.selectedCategories.forEach((category) => {
              this.booksByCatServ.addCategoryToBooks(
                responseData.bookId,
                category.id
              );
            });
          }
          for (let i = 1; i <= form.value.quantity; i++) {
            this.booksService.addBook(responseData.bookId);
            if (i == form.value.quantity) {
              form.resetForm();
            }
          }
        });
    }
  }

  ngOnInit() {
    this.booksByCatServ.getCategoriesByBooks();
    this.categoriesService.getCategories();
    this.categoriesService.getCategoriesUpdateListener().subscribe((data) => {
      this.categoryList = data;
    });
    this.route.paramMap.subscribe((paramMap: ParamMap) => {
      if (paramMap.has('id')) {
        this.canEdit = true;
        let input = <HTMLInputElement>(
          document.querySelector('input[name="isbn"]')
        );
        input.style.color = 'rgb(160, 160, 160';
        this.bookId = paramMap.get('id');
        this.booksDataService.getBook(this.bookId).subscribe((bookData) => {
          this.book = {
            id: bookData.id,
            title: bookData.title,
            description: bookData.description,
            publication_date: bookData.publication_date,
            author: bookData.author,
            publisher: bookData.publisher,
            image: bookData.image,
            isbn: bookData.isbn,
          };
        });

        this.booksByCatServ.getCategoriesByBook(this.bookId);
        this.booksByCatServ
          .getCategoriesUpdateListener()
          .pipe(
            map((documents) => {
              this.categories = documents;
              let categoriesName = [];
              documents.forEach((category) => {
                categoriesName.push(category.category_name);
              });
              return categoriesName;
            })
          )
          .subscribe((categoriesName) => {
            this.editCategories = categoriesName;
          });
        this.booksService.getBooksByData(this.bookId);
        this.booksService.getBooksUpdateListener().subscribe((documents) => {
          this.bookCopies = documents;
        });
      } else {
        this.canEdit = false;

        this.bookId = null;
      }
    });
  }

  onImageError(event: any, form: NgForm) {
    event.target.src = this.imgPlaceholder;
    form.controls['image'].setErrors({ error: true });
  }

  onEditISBN() {
    let input = <HTMLInputElement>document.querySelector('input[name="isbn"]');
    if (input.readOnly) {
      input.style.color = 'white';
      input.readOnly = false;
    } else {
      input.style.color = 'rgb(160, 160, 160';
      input.readOnly = true;
    }
  }

  onCheckISBN(isbn: string, form: NgForm) {
    this.booksDataService.checkISBN(isbn).subscribe((response) => {
      if (!response.isValid && this.book.isbn != isbn) {
        form.controls['isbn'].setErrors({ exists: true });
      }
    });
  }

  onAddBookCopy() {
    this.booksService.addBook(this.bookId);
  }

  onDeleteBookCopy(bookId: string) {
    this.booksService.deleteBook(bookId);
  }
}
