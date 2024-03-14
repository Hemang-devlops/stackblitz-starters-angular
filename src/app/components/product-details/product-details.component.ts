import { Component } from '@angular/core';
import { ProductService } from '../../services/product.service';
import { ActivatedRoute } from '@angular/router';
import { Product } from '../../app/data-type';

@Component({
  selector: 'app-product-details',
  standalone: true,
  imports: [],
  templateUrl: './product-details.component.html',
  styleUrl: './product-details.component.css'
})
export class ProductDetailsComponent {
  constructor(private productService: ProductService, private activatedRoute: ActivatedRoute){}

  productData: Product | undefined;
  productId: string = "";
  isLoading = false;

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params) => {
      this.productId = params['id'];
      if (this.productId) {
        this.isLoading = true; // Set loading indicator
        this.productService.getProduct(this.productId).subscribe({
          next: (result) => {
            this.productData = result;
            this.isLoading = false; // Hide loading indicator upon success
          },
          error: (error) => {
            this.isLoading = false; // Hide loading indicator on error
            console.error("Error fetching product:", error);
            // Handle error (e.g., display error message to user)
          }
        });
      }
    });
  }

  // ngOnInit(): void {
  //   this.activatedRoute.params.subscribe((params) => {
  //     this.productId = params['id'];
  //     if (this.productId) {
  //       console.log(this.productId);
  //       this.getProduct(this.productId);
  //     }
  //   })
  // }

  // getProduct(id: string) {
  //   this.product.getProduct(id).subscribe({
  //     next: (result) => {
  //       this.productData = result;
  //       // this.isLoading = false; // Hide loading indicator upon success
  //     },
  //     error: (error) => {
  //       // this.isLoading = false; // Hide loading indicator on error
  //       console.error("Error fetching product:", error);
  //       // Handle error (e.g., display error message to user)
  //     }
  //   })
  // }
}
