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

  getProducts(){
    return this.http.get<Product[]>(`http://localhost:3000/products/`);
  }

  getProduct(id: string){
    return this.http.get<Product>(`http://localhost:3000/products/${id}`);
  }

  removeProduct(id: number){
    return this.http.delete(`http://localhost:3000/products/${id}`);
  }

  updateProduct(id: string, data: Product){
    return this.http.put(`http://localhost:3000/products/${id}`, data);
  }
}
