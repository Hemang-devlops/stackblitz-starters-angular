import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Product } from '../app/data-type';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private http: HttpClient) { }

  addProduct(data: Product){
    return this.http.post("http://localhost:3000/products", data);
  }

  getProducts(query: string){
    return this.http.get<Product[]>(`http://localhost:3000/products/${query}`);
  }
}
