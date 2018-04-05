import { Component, OnInit } from '@angular/core';
import {CategoryService} from 'shared/services/category/category.service';
import {ProductService} from 'shared/services/product/product.service';
import {ActivatedRoute, Router} from '@angular/router';
import 'rxjs/add/operator/take';


interface ProductObject {
    [key: string]: any;
}

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.css']
})
export class ProductFormComponent implements OnInit {
  categories$;
  product: ProductObject = {};
  id;
  fileToUpload: File = null;

  constructor(
    private categoryService: CategoryService,
    private productService: ProductService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.categories$ = categoryService.getCategories();

    this.id = this.route.snapshot.paramMap.get('id');
    if (this.id) {
      this.productService.get(this.id).take(1).subscribe(p => this.product = p);
    }
  }

  save(product) {
    const formData = new FormData();
    for (const key in product) {
      if (product.hasOwnProperty(key)) {
        formData.append(key, product[key]);
      }
    }
    if (this.fileToUpload) {
      formData.set('image', this.fileToUpload, this.fileToUpload.name);
    }

    let sub;
    if (this.id) {
      sub = this.productService.update(this.id, formData);
    } else {
      sub = this.productService.create(formData);
    }
    sub.subscribe(() => this.router.navigate(['/admin/products']));
  }

  delete() {
    if (!confirm('Are you sure you want to delete this product?')) { return; }
    this.productService.delete(this.id).subscribe(() => this.router.navigate(['/admin/products']));
  }

  handleFileInput(files: FileList) {
    this.fileToUpload = files.item(0);
    const reader = new FileReader();
        reader.onload = (e: any) => {
          this.product.image = e.target.result;
        };
        reader.readAsDataURL(this.fileToUpload);
  }

  ngOnInit() {
  }

}
