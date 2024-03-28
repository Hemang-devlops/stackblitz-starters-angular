import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Product, ResultList } from '../app/data-type';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  constructor(private http: HttpClient) {}

  addProduct(data: Product) {
    return this.http.post('https://dummyjson.com/products', data)
  }

  getProducts() {
    return this.http.get<ResultList>(`https://dummyjson.com/products/`)
  }

  getProduct(id: string | null) {
    return this.http.get<Product>(`https://dummyjson.com/products/${id}`)
  }

  removeProduct(id: number) {
    return this.http.delete(`https://dummyjson.com/products/${id}`)
  }

  updateProduct(id: string, data: Product) {
    return this.http.put(`https://dummyjson.com/products/${id}`, data)
  }

  popularProduct() {
    return this.http.get<ResultList>(
      `https://dummyjson.com/products?limit=4&rating_gt=4&skip=4`
    )
  }

  menProduct() {
    return this.http.get<ResultList>(
      `https://dummyjson.com/products/category/mens-shirts?limit=4`
    )
  }

  womenProduct() {
    return this.http.get<ResultList>(
      `https://dummyjson.com/products/category/womens-dresses?limit=4`
    )
  }

  accesProduct() {
    return this.http.get<ResultList>(
      `https://dummyjson.com/products/category/womens-jewellery?limit=4`
    )
  }

  searchProduct(query: string | null) {
    console.log(`https://dummyjson.com/products/search?q=${query}&limit=9`);
    return this.http.get<ResultList>(
      `https://dummyjson.com/products/search?q=${query}&limit=9`
    )
  }
}
