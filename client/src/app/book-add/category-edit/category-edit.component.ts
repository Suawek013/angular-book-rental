import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { CategoriesService } from 'src/app/categories.service';
import { Category } from 'src/app/category.model';

@Component({
  selector: 'app-category-edit',
  templateUrl: './category-edit.component.html',
  styleUrls: ['./category-edit.component.css'],
})
export class CategoryEditComponent implements OnInit {
  categoryForm: FormGroup;
  categories: Category[] = [];
  // isEditMode = false;

  constructor(private categoriesService: CategoriesService) {}

  ngOnInit(): void {
    this.categoryForm = new FormGroup({
      'new-categories': new FormArray([]),
      categories: new FormArray([]),
    });
    this.categoriesService.getCategories();
    this.categoriesService.getCategoriesUpdateListener().subscribe((data) => {
      this.categories = data;
    });
  }

  onSubmit() {
    this.categoryForm.get('new-categories').value.forEach((category) => {
      this.categoriesService.addCategory(category);
    });
    this.categoryForm.reset();
    (<FormArray>this.categoryForm.get('new-categories')).clear();
    // this.isEditMode = false; Tu był błąd <-- no spoko
  }

  onAddCategory() {
    const control = new FormControl(null, Validators.required);
    (<FormArray>this.categoryForm.get('new-categories')).push(control);
  }

  get controls() {
    return (this.categoryForm.get('new-categories') as FormArray).controls;
  }

  onDeleteCategory(index: string) {
    this.categoriesService.deleteCategory(index);
  }

  // onEditCategory() {
  //   this.isEditMode = true;
  // }
}
