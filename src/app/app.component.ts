import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ProductAddEditComponent } from './product-add-edit/product-add-edit.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'angular-product-management';

  constructor(private _dialog: MatDialog) {}

  openAddEditProductForm() {
    this._dialog.open(ProductAddEditComponent);
  }
}
