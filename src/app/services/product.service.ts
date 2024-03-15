import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Product } from '../app/data-type';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private http: HttpClient) { }

  addProduct(data: Product) {
    return this.http.post("http://localhost:3000/products", data);
  }

  getProducts() {
    return this.http.get<Product[]>(`http://localhost:3000/products/`);
  }

  getProduct(id: string | null) {
    return this.http.get<Product>(`http://localhost:3000/products/${id}`);
  }

  removeProduct(id: number) {
    return this.http.delete(`http://localhost:3000/products/${id}`);
  }

  updateProduct(id: string, data: Product) {
    return this.http.put(`http://localhost:3000/products/${id}`, data);
  }

  popularProduct() {
    return this.http.get<Product[]>(`http://localhost:3000/products?rating_gt=4&_limit=4`);
  }

  menProduct() {
    return this.http.get<Product[]>(`http://localhost:3000/products?category=mens-shirts&_limit=4`);
  }

  womenProduct() {
    return this.http.get<Product[]>(`http://localhost:3000/products?category=womens-dresses&_limit=4`);
  }

  accesProduct() {
    return this.http.get<Product[]>(`http://localhost:3000/products?category=womens-jewellery&_limit=4`);
  }

  searchProduct(query: string) {
    return this.http.get<Product[]>(`https://dummyjson.com/products/search?q=${query}`);
  }
}
