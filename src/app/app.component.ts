import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ProductAddEditComponent } from './product-add-edit/product-add-edit.component';
import { ProductService } from './services/product.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit {
  title = 'angular-product-management';

  constructor(
    private _dialog: MatDialog,
    private _productService: ProductService
  ) {}

  ngOnInit(): void {
    this.getProductList();
  }

  openAddEditProductForm() {
    this._dialog.open(ProductAddEditComponent);
  }

  getProductList() {
    this._productService.getProductList().subscribe({
      next: (res) => {
        console.log(res);
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
}
