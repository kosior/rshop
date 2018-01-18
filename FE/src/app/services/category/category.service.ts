import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../environments/environment';
import {Category} from '../../models/category.model';

@Injectable()
export class CategoryService {
  private categoriesUrl = environment.apiBaseUrl + 'categories/';

  constructor(private http: HttpClient) { }

  getCategories() {
    return this.http.get<Category[]>(this.categoriesUrl, {params: {ordering: 'name'}});
  }
}
