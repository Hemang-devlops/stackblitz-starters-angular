import { Component, EventEmitter, OnInit } from '@angular/core';
import { Product } from '../../app/data-type';
import { ProductService } from '../../services/product.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css'
})
export class CartComponent implements OnInit{
  cartData!: Product[];
  emptyCart = true;
  itemTotalPrice = 0;
  totalPrice = this.itemTotalPrice;
  deliveryPrice : number = 0;
  deliveryPriceList = [
    {value: '0', name: `Select Delivery Type `, disabled: true},
    {value: 5, name: 'Standard-Delivery- $5.00', disabled: false},
    {value: 10, name: 'Single-Day-Delivery- $10.00', disabled: false}
  ]
  totalItems!: number;
  localCart = new EventEmitter<Product[]>();



  constructor (private productService: ProductService){}

  ngOnInit(): void {
    let localCart = localStorage.getItem("localCart")
    if (localCart){
      this.emptyCart = false;
      this.cartData = JSON.parse(localCart);
      this.productService.cartData.subscribe(items => {
      console.log(items);
      this.cartData = items;
      })
    }
    this.calculateTotal();
  }

  calculateTotal() {
    const totalQuantity = this.cartData.reduce((prev, curr) => prev + (curr.quantity || 0), 0);
    const itemTotalPrice = this.cartData.reduce((prev, curr) => prev + (curr.price || 0) * (curr.quantity || 0), 0);
    this.totalItems = totalQuantity;
    this.itemTotalPrice = itemTotalPrice;
    this.totalPrice = itemTotalPrice + parseFloat(this.deliveryPrice.toString());
    console.log(itemTotalPrice, this.deliveryPrice, typeof this.deliveryPrice);
  }
  
  changeQuantity(product: Product, change: string) {
    const existingItem = this.cartData.find(item => item.id === product.id);
    if (existingItem && existingItem.quantity){
      existingItem.quantity = Math.max(1, change === 'inc' ? Math.min(existingItem.quantity + 1, 20) : existingItem.quantity - 1);

    }
    this.calculateTotal();
  }

  removeItem(product: Product){
    this.productService.removeItemFromCart(product.id);
  }

}
