import { HttpClient } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
import { Product, ResultList } from '../data-type';

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

  popularProduct(noLimit = false) {
    const url = `https://dummyjson.com/products?rating_gt=4${noLimit ? '': '&limit=4' }`;
    return this.http.get<ResultList>(url);
  }  

  // menProduct(noLimit = false, style = null) {
  //   const limit = 4
  //   if (noLimit){
  //     return this.http.get<ResultList>(
  //       `https://dummyjson.com/products/category/mens-shirts?limit=${limit}`
  //     )
  //   }
  //   if (!style){
  //     return this.http.get<ResultList>(
  //       `https://dummyjson.com/products/category/mens-shirts`
  //     )
  //   }
  //   return this.http.get<ResultList>(
  //     `https://dummyjson.com/products/category/${style}`
  //   )
  // }

  menProduct(noLimit = false, style?: string) {
    const url = `https://dummyjson.com/products/category/${style || 'mens-shirts'}`;
    return this.http.get<ResultList>(`${url}${noLimit ? '': '?limit=4' }`);
  }  
  
  womenProduct(noLimit = false, style?: string) {
    const url = `https://dummyjson.com/products/category/${style || 'womens-dresses'}`;
    return this.http.get<ResultList>(`${url}${noLimit ? '': '?limit=4' }`);
  }

  assesProduct(noLimit = false, style?: string) {
    const url = `https://dummyjson.com/products/category/${style || 'womens-jewellery'}`;
    return this.http.get<ResultList>(`${url}${noLimit ? '': '?limit=4' }`);
  }

  categoryProduct(noLimit = false, style?: string) {
    const url = `https://dummyjson.com/products/category/${style}`;
    return this.http.get<ResultList>(`${url}${noLimit ? '': '?limit=4' }`);
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
