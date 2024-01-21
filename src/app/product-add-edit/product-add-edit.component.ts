import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ProductService } from '../services/product.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-product-add-edit',
  templateUrl: './product-add-edit.component.html',
  styleUrl: './product-add-edit.component.scss',
})
export class ProductAddEditComponent implements OnInit {
  productForm: FormGroup;

  constructor(
    private _formBuilder: FormBuilder,
    private _productService: ProductService,
    private _dialogRef: MatDialogRef<ProductAddEditComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.productForm = this._formBuilder.group({
      product: '',
      location: '',
      onHand: '',
      forecast: '',
      route: '',
      min: '',
      max: '',
      toOrder: '',
    });
  }

  ngOnInit(): void {
    this.productForm.patchValue(this.data);
  }

  onFormSubmit() {
    if (this.productForm.valid) {
      if (this.data) {
        this._productService
          .updateProduct(this.data.id, this.productForm.value)
          .subscribe({
            next: (val: any) => {
              alert('Product updated');
              this._dialogRef.close(true);
            },
            error: (err: any) => {
              console.error(err);
            },
          });
      } else {
        this._productService.addProduct(this.productForm.value).subscribe({
          next: (val: any) => {
            alert('Product added successfully');
            this._dialogRef.close(true);
          },
          error: (err: any) => {
            console.error(err);
          },
        });
      }
    }
  }

  product: string[] = [
    '[E-COM06] Coner Desk',
    '[E-COM09] Large Desk',
    '[E-7777] Office Chair',
    '[E-8888] Office Lamp',
    '[E-9000] Drawer Black',
    '[FURN-9001] Flipover',
    '[FURN-9666] Table',
  ];

  location: string[] = [
    'WH/Stock/1',
    'WH/Stock/2',
    'WH/Stock/3',
    'WH/Stock/4',
    'WH/Stock/5',
  ];

  route: string[] = [
    'Manufacture/1',
    'Manufacture/2',
    'Manufacture/3',
    'Manufacture/4',
    'Manufacture/5',
  ];

  onHandNumber: any;
  onOnHandChange(event: any) {
    this.onHandNumber = Number.parseFloat(event).toFixed(2);
  }

  forecastNumber: any;
  onForecastChange(event: any) {
    this.forecastNumber = Number.parseFloat(event).toFixed(2);
  }

  minNumber: any;
  onMinChange(event: any) {
    this.minNumber = Number.parseFloat(event).toFixed(2);
  }

  maxNumber: any;
  onMaxChange(event: any) {
    this.maxNumber = Number.parseFloat(event).toFixed(2);
  }

  toOrderNumber: any;
  onToOrderChange(event: any) {
    this.toOrderNumber = Number.parseFloat(event).toFixed(2);
  }
}
