import { TestBed } from '@angular/core/testing';

import { BooksByCategoryService } from './books-by-category.service';

describe('BooksByCategoryService', () => {
  let service: BooksByCategoryService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BooksByCategoryService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
