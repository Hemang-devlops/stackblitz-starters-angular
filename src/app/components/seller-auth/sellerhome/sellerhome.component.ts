import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../../services/product.service';
import { Product } from '../../../app/data-type';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-sellerhome',
  standalone: true,
  imports: [ CommonModule],
  templateUrl: './sellerhome.component.html',
  styleUrl: './sellerhome.component.css'
})
export class SellerhomeComponent implements OnInit{
  constructor(private product: ProductService){}
  productList : Product[] | undefined;
  ngOnInit(): void {
    this.product.getProducts("").subscribe(result => {
      if (result){
        this.productList = result;
        console.log(result);
      } else{
        console.error("product not found");
      }
    })
  }



}
