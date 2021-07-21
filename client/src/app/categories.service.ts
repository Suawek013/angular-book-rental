import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Category } from './category.model';
import { environment } from '../environments/environment';

const apiUrl = environment.apiUrl;

@Injectable({
  providedIn: 'root',
})
export class CategoriesService {
  private categories: Category[] = [];
  private categoriesUpdated = new Subject<Category[]>();

  constructor(private http: HttpClient) {}

  getCategories() {
    this.http
      .get<{ message: string; categories: Category[] }>(
        apiUrl + '/api/category'
      )
      .subscribe((data) => {
        this.categories = data.categories;
        this.categoriesUpdated.next([...this.categories]);
      });
  }

  getCategory(id: string) {
    return this.http.get<{ id: string; category_name: string }>(
      apiUrl + '/api/category/' + id
    );
  }

  getCategoriesUpdateListener() {
    return this.categoriesUpdated.asObservable();
  }

  deleteCategory(id: string) {
    this.http
      .delete<{ message: string }>(apiUrl + '/api/category/' + id)
      .subscribe((data) => {
        const updatedCategories = this.categories.filter(
          (category) => category.id != id
        );
        this.categories = updatedCategories;
        this.categoriesUpdated.next([...this.categories]);
      });
  }

  addCategory(category_name: string) {
    const category: Category = {
      id: null,
      category_name: category_name,
    };
    this.http
      .post<{ categoryId: string; message: string }>(
        apiUrl + '/api/category/',
        category
      )
      .subscribe((responseData) => {
        category.id = responseData.categoryId;
        this.categories.push(category);
        this.categoriesUpdated.next([...this.categories]);
      });
  }
}
