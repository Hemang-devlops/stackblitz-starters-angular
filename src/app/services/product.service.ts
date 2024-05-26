import { HttpClient } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
import { Product, ResultList } from '../app/data-type';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  constructor(private http: HttpClient) {}

  cartData = new EventEmitter<Product[]>();

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

  searchProduct(query: string | null, limit?: number) {
    if(limit){
      return this.http.get<ResultList>(
        `https://dummyjson.com/products/search?q=${query}&limit=${limit}`
      )
    }
    return this.http.get<ResultList>(
      `https://dummyjson.com/products/search?q=${query}&limit=8`
    )
  }

  localAddToCart(data: Product){
    let cartData : Product[] = [];
    let localCart = localStorage.getItem("localCart")
    if (!localCart){
      localStorage.setItem('localCart', JSON.stringify([data]));
    } else{
      cartData = JSON.parse(localCart);
      const existingItem = cartData.find(item => item.id === data.id);
      if (existingItem && existingItem.quantity){
        existingItem.quantity += 1;
      } else{
        cartData.push(data);
      }
      console.log(cartData, 'new');
      localStorage.setItem('localCart', JSON.stringify(cartData));
    }
    this.cartData.emit(cartData);
  }

  removeItemFromCart(productId: number){
    let cartData = localStorage.getItem("localCart");
    if(cartData){
      let items: Product[] = JSON.parse(cartData);
      items = items.filter((item : Product) => productId !== item.id);
      localStorage.setItem('localCart', JSON.stringify(items));
      this.cartData.emit(items);
    }
  }
}
