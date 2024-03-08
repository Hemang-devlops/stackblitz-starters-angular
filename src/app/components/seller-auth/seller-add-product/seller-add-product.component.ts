import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../../services/product.service';
import { Product } from '../../../app/data-type';

@Component({
  selector: 'app-seller-add-product',
  templateUrl: './seller-add-product.component.html',
  styleUrl: './seller-add-product.component.css'
})
export class SellerAddProductComponent implements OnInit {
  constructor(private product: ProductService) { }

  ngOnInit(): void {

  }

  addProductMessage : string | undefined;

  addProduct(data: Product) {
    this.product.addProduct(data).subscribe((result) => {
      console.log(result);
      if (result){
        this.addProductMessage = "Product is successfully added."
      };
      setTimeout(() => this.addProductMessage = undefined, 3000);
    })
  }
}
