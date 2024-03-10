import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../../services/product.service';
import { Product } from '../../../app/data-type';
import { faPenToSquare } from '@fortawesome/free-solid-svg-icons'
import { faTrash } from '@fortawesome/free-solid-svg-icons'
import { Router } from '@angular/router';

@Component({
  selector: 'app-sellerhome',
  templateUrl: './sellerhome.component.html',
  styleUrl: './sellerhome.component.css'
})
export class SellerhomeComponent implements OnInit {
  constructor(private product: ProductService, private router: Router) { }
  productList: Product[] | undefined;
  deleteMsg: string = '';
  deleteIcon = faTrash;
  editIcon = faPenToSquare;

  ngOnInit(): void {
    this.getProductList();
  }

  getProductList() {
    this.product.getProducts().subscribe(result => {
      if (result) {
        this.productList = result;
      } else {
        console.error("product not found");
      }
    })
  }

  removeProduct(id: number) {
    this.product.removeProduct(id).subscribe(result => {
      if (result) {
        this.deleteMsg = 'Product removed successfully';
      }
      setTimeout(() => {
        this.deleteMsg = "";
      }, 3000);
      this.getProductList();
    });
  }
}
