import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Book_data } from './book_data.model';
import { Book_by_category } from './book_by_category.model';
import { CategoriesService } from './categories.service';
import { Category } from './category.model';
import { environment } from '../environments/environment';

const apiUrl = environment.apiUrl;

@Injectable({
  providedIn: 'root',
})
export class BooksByCategoryService {
  private booksByCategory: Book_by_category[] = [];
  private categories: Category[] = [];
  private bookCategories: Category[] = [];
  public categoriesUpdated = new Subject<Category[]>();
  private fetchedCategories: Category[] = [];

  constructor(
    private http: HttpClient,
    private categoriesService: CategoriesService
  ) {}

  getBooksByCategory(categoryId: string) {
    return this.http.get<{ message: string; books: Book_data[] }>(
      apiUrl + '/api/book_by_category/category/' + categoryId
    );
    // .subscribe(data => {
    //   this.booksByCategory = data;
    // });
  }

  getBooksByCategories(categoriesId: string[]) {
    return this.http.get<{ message: string; books: Book_data[] }>(
      apiUrl + '/api/book_by_category/categories/' + categoriesId
    );
  }

  addCategoryToBooks(bookId: string, categoryId: string) {
    const bookByCategory: Book_by_category = {
      id: null,
      book_id: bookId,
      category_id: categoryId,
    };
    this.http
      .post<{ bookByCategoryId: string; message: string }>(
        apiUrl + '/api/book_by_category/',
        bookByCategory
      )
      .subscribe((data) => {
        bookByCategory.id = data.bookByCategoryId;
      });
  }

  updateBookCategories(bookId: string, categoryId?: string) {
    const bookByCategory: Book_by_category = {
      id: null,
      book_id: bookId,
      category_id: categoryId,
    };
    this.http
      .put<{ message: string }>(
        apiUrl + '/api/book_by_category/',
        bookByCategory
      )
      .subscribe((data) => {});
  }

  deleteBooksByCategories(bookId: string) {
    return this.http.delete(apiUrl + '/api/book_by_category/' + bookId);
  }

  getCategoriesByBooks() {
    this.http
      .get<{ message: string; booksByCategory: Book_by_category[] }>(
        apiUrl + '/api/book_by_category/'
      )
      .subscribe((data) => {
        this.booksByCategory = data.booksByCategory;
      });
  }

  getCategoriesByBook(bookId: string) {
    this.http
      .get<{ booksByCategory: Book_by_category[] }>(
        apiUrl + '/api/book_by_category/' + bookId
      )
      .subscribe((data) => {
        this.categories = [];
        data.booksByCategory.forEach((document) => {
          this.categoriesService
            .getCategory(document.category_id)
            .subscribe((result) => {
              const category: Category = {
                id: result.id,
                category_name: result.category_name,
              };
              this.categories.push(category);

              this.categoriesUpdated.next(this.categories);
            });
        });
      });
  }
  getCategoriesUpdateListener() {
    return this.categoriesUpdated.asObservable();
  }
}
