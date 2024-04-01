import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
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
    {value: 5, name: `Standard-Delivery- `},
    {value: 10, name: `Single-Day-Delivery- `}
  ]
  totalItems!: number;


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
    this.itemTotalPrice = this.cartData.reduce((prev: number, curr: Product) => {
      const price = curr.price !== undefined ? curr.price : 0;
      const quantity = curr.quantity || 0;
      return prev + price * quantity;
    }, 0);

    this.totalItems = this.cartData.reduce((prev: number, curr: Product) => {
      const quantity = curr.quantity || 1;
      return prev + quantity;
    }, 0);

    this.totalPrice = this.itemTotalPrice + parseFloat(this.deliveryPrice.toString());
    console.log(this.itemTotalPrice,(this.deliveryPrice), typeof(this.deliveryPrice))
  }

  

}
