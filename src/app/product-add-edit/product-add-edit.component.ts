import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { ProductService } from '../services/product.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { CoreService } from '../core/core.service';

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
    @Inject(MAT_DIALOG_DATA) public data: any,
    private _coreService: CoreService
  ) {
    this.productForm = this._formBuilder.group({
      product: new FormControl(''),
      location: new FormControl(''),
      onHand: new FormControl(''),
      forecast: new FormControl(''),
      route: new FormControl(''),
      min: new FormControl(''),
      max: new FormControl(''),
      toOrder: new FormControl(''),
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
              this._coreService.openSnackBar('Product detail updated', 'done');
              this._dialogRef.close(true);
            },
            error: (err: any) => {
              console.error(err);
            },
          });
      } else {
        this._productService.addProduct(this.productForm.value).subscribe({
          next: (val: any) => {
            this._coreService.openSnackBar(
              'Product added successfully',
              'done'
            );
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
}
