import { Component, OnInit } from '@angular/core';
import { Product } from '../../../app/data-type';
import { ProductService } from '../../../services/product.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-seller-edit-product',
  templateUrl: './seller-edit-product.component.html',
  styleUrl: './seller-edit-product.component.css'
})
export class SellerEditProductComponent implements OnInit {
  constructor(private product: ProductService, private activatedRoute: ActivatedRoute, private router: Router) { }

  addProductMessage: string | undefined;
  productData: Product | undefined;
  productId: string = "";

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params) => {
      this.productId = params['id'];
      if (this.productId !== '?') {
        console.log(this.productId);
        this.productId && this.getProduct(this.productId);
      }
    })
  }

  getProduct(id: string) {
    this.product.getProduct(id).subscribe(result => {
      if (result) {
        this.productData = result;
        console.log(result);
      } else {
        console.error("product not found");
      }
    })
  }

  updateProduct(data: Product) {
    this.product.updateProduct(this.productId, data).subscribe((result) => {
      console.log(result);
      if (result) {
        this.addProductMessage = "Product is successfully updated."
      };
      setTimeout(() => {
        this.addProductMessage = undefined;
        this.router.navigate(['seller-home']);
      }, 2000);
    })
  }
}