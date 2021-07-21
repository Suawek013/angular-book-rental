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
  bookCopies: Book[] = [];

  imageError = false;
  imgPlaceholder = 'assets/Images/image-not-found.jpg';

  minDate: Date;
  maxDate: Date;

  @Input() quantity = 1;

  categories: Category[] = []; // categories selected by user
  categoryList: Category[] = []; // categories fetched from database
  editCategories = ['none was assigned']; // categories already assigned to a book

  constructor(
    private booksDataService: BooksDataService,
    private route: ActivatedRoute,
    private categoriesService: CategoriesService,
    private booksByCatServ: BooksByCategoryService,
    private router: Router,
    private booksService: BooksService,
    readonly snackBar: MatSnackBar
  ) {
    // Set minimum & maximum on date picker
    this.minDate = new Date(1970, 0, 1);
    this.maxDate = new Date();
  }

  ngOnInit() {
    // Fetch data from database
    this.booksByCatServ.getCategoriesByBooks();
    this.categoriesService.getCategories();
    this.categoriesService.getCategoriesUpdateListener().subscribe((data) => {
      this.categoryList = data;
    });

    // If URL contains ID then change mode to Edit
    this.route.paramMap.subscribe((paramMap: ParamMap) => {
      if (paramMap.has('id')) {
        this.canEdit = true;
        let input = <HTMLInputElement>(
          document.querySelector('input[name="isbn"]')
        );
        input.style.color = 'rgb(160, 160, 160';
        this.bookId = paramMap.get('id');

        // Find book via ID and complete the form with data
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

        // Find categories assigned to Book and list them on the form
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

        // Find book copies associated with given ID of bookData
        this.booksService.getBooksByData(this.bookId);
        this.booksService.getBooksUpdateListener().subscribe((documents) => {
          this.bookCopies = documents;
        });
      }

      // If URL doesn't contain ID then turn off Edit mode
      else {
        this.canEdit = false;
        this.bookId = null;
      }
    });
  }

  onSaveBook(form: NgForm) {
    // Don't save if not valid
    if (form.invalid) {
      return;
    }

    // If form concerns already created book
    if (this.canEdit) {
      // Retrieve data from the form and update bookData
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

      // Delete old book connection with categories and assign new categories
      this.booksByCatServ.deleteBooksByCategories(this.bookId).subscribe(() => {
        if (form.value.selectedCategories) {
          form.value.selectedCategories.forEach((category) => {
            this.booksByCatServ.updateBookCategories(this.bookId, category.id);
          });
        }

        // Reset form and navigate to book list
        this.editCategories = [];
        form.resetForm();
        this.router.navigate(['book-add/book-list']);
      });
    }

    // If form concerns a new book
    else {
      // Retrieve data from the form and create new bookData
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
          // Display a possible error message
          if (typeof responseData.bookId == 'undefined') {
            this.snackBar.open(responseData.message, '', {
              horizontalPosition: 'start',
              duration: 4000,
              panelClass: ['snackBar'],
            });
            return;
          }

          // Assign categories to books
          if (form.value.selectedCategories) {
            form.value.selectedCategories.forEach((category) => {
              this.booksByCatServ.addCategoryToBooks(
                responseData.bookId,
                category.id
              );
            });
          }

          // Add book copies with assigned bookData
          for (let i = 1; i <= form.value.quantity; i++) {
            this.booksService.addBook(responseData.bookId);
            if (i == form.value.quantity) {
              form.resetForm();
            }
          }
        });
    }
  }

  // Handle error when image is not found
  onImageError(event: any, form: NgForm) {
    event.target.src = this.imgPlaceholder;
    form.controls['image'].setErrors({ error: true });
  }

  // Change ISBN input field accessibility
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

  // Validate the ISBN code
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
