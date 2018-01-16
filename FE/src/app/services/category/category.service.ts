import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../environments/environment';

@Injectable()
export class CategoryService {
  private categoriesUrl = environment.apiBaseUrl + 'categories/';

  constructor(private http: HttpClient) { }

  getCategories() {
    return this.http.get(this.categoriesUrl, {params: {ordering: 'name'}});
  }
}
