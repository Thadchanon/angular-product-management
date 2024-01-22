import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private localStorageKey = 'productData';

  private getProductsFromLocalStorage(): any[] {
    const data = localStorage.getItem(this.localStorageKey);
    return data ? JSON.parse(data) : [];
  }

  private setProductsToLocalStorage(products: any[]): void {
    localStorage.setItem(this.localStorageKey, JSON.stringify(products));
  }

  addProduct(data: any): Observable<any> {
    try {
      const products = this.getProductsFromLocalStorage();
      products.push(data);
      this.setProductsToLocalStorage(products);
      return of(data);
    } catch (error) {
      throw new Error('Cannot add product');
    }
  }

  updateProduct(id: string, data: any): Observable<any> {
    try {
      const products = this.getProductsFromLocalStorage();
      const index = products.findIndex((product) => product.id === id);
      if (index !== -1) {
        products[index] = { ...products[index], ...data };
        this.setProductsToLocalStorage(products);
        return of(products[index]);
      } else {
        throw new Error(`Product with ID ${id} not found`);
      }
    } catch (error) {
      throw new Error('Cannot update product');
    }
  }

  getProductList(): Observable<any> {
    try {
      const products = this.getProductsFromLocalStorage();
      return of(products);
    } catch (error) {
      throw new Error('Cannot get product list');
    }
  }

  deleteProduct(id: string): Observable<any> {
    try {
      const products = this.getProductsFromLocalStorage();
      const index = products.findIndex((product) => product.id === id);
      if (index !== -1) {
        const deletedProduct = products.splice(index, 1)[0];
        this.setProductsToLocalStorage(products);
        return of(deletedProduct);
      } else {
        throw new Error(`Product with ID ${id} not found`);
      }
    } catch (error) {
      throw new Error('Cannot delete product list');
    }
  }
}
