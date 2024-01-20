import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-product-add-edit',
  templateUrl: './product-add-edit.component.html',
  styleUrl: './product-add-edit.component.scss',
})
export class ProductAddEditComponent {
  productForm: FormGroup;

  constructor(private _formBuilder: FormBuilder) {
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

  onFormSubmit() {
    if (this.productForm.valid) {
      console.log(this.productForm.value);
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